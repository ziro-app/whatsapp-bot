const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios')
const responseOk = require('../utils/response')
const validateCnpj = require('../utils/validateCnpj')
const { register, endRegister } = require('../utils/messages')

const sheetConfig = data => ({
    method: 'POST',
    url: process.env.SHEET_URL,
    headers: {
        'Origin': 'https://ziro.app',
        'Content-Type': 'application/json',
        'Authorization': process.env.SHEET_TOKEN
    },
    data: {
        apiResource: 'values',
        apiMethod: 'append',
        spreadsheetId: process.env.SHEET_ID,
        range: 'Leads!A1',
        resource: {
            values: [
                [...data]
            ]
        },
        valueInputOption: 'raw'
    }
})

const cnpjConfig = cnpj => ({
    method: 'POST',
    url: process.env.CNPJ_URL,
    headers: {
        'Origin': 'https://ziro.app',
        'Content-Type': 'application/json',
        'Authorization': process.env.CNPJ_TOKEN
    },
    data: { cnpj }
})

const autopilot = async event => {
    try {
        if (event.body.Memory) {
            const memory = JSON.parse(event.body.Memory)
            console.log(memory)
            console.log(memory.twilio.collected_data)
            if (!memory.twilio.collected_data.register) return responseOk(register)
            const cnpj = event.body.CurrentInput
            const cnpjIsValid = !!Number(cnpj) && cnpj.toString().length === 14
            if (cnpjIsValid) {
                const { data: { status, result } } = await axios(cnpjConfig(cnpj))
                const message = validateCnpj(status, result)
                if (message.slice(0,2) === 'OK') {
                    const { products, prices, style } = memory.twilio.collected_data
                    const { productOne, productTwo, productThree } = products.answers
                    const { priceOne, priceTwo, priceThree } = prices.answers
                    const styleAnswer = style.answers
                    console.log(productOne)
                    console.log(productTwo)
                    console.log(productThree)
                    console.log(priceOne)
                    console.log(priceTwo)
                    console.log(priceThree)
                    console.log(styleAnswer)
                    const { data } = await axios(sheetConfig([
                        productOne.answer, productTwo.answer, productThree.answer,
                        priceOne.answer, priceTwo.answer, priceThree.answer,
                    ]))
                    console.log(data)
                }
                return responseOk(endRegister(message))
            }
            return responseOk(endRegister('Seu Cnpj está mal formatado. Ele precisa ter 14 digitos, sem pontuação. Você pode tentar de novo, mas se preferir, pode mandar uma mensagem para esse número de Whatsapp +55 (11) 3334-0920 e nossa equipe vai te ajudar com seu cadastro!'))
        }
        throw createError(404, 'Invalid Twilio Request. Memory is empty')
    } catch (error) { throw error }
}

const handler = middy(autopilot)
    .use(httpUrlencodeBodyParser())
    .use(httpErrorHandler())

module.exports = { handler }