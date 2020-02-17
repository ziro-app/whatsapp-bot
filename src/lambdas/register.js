const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios')
const responseOk = require('../utils/response')
const validateCnpj = require('../utils/validateCnpj')
const { register, endRegister } = require('../utils/messages')

const sheetConfig = {
    method: 'POST',
    url: process.env.SHEET_URL,
    headers: {
        'Origin': 'https://ziro.app',
        'Content-Type': 'application/json',
        'Authorization': process.env.SHEET_TOKEN
    },
    data: {
        apiResource: 'values',
        apiMethod: 'batchGet',
        spreadsheetId: process.env.SHEET_ID,
        ranges: ['Base!A:G','Produtos!A:U', `'Faixa Preços'!A:D`]
    }
}

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
            if (!memory.twilio.collected_data) return responseOk(register)
            const cnpj = event.body.CurrentInput
            const cnpjIsValid = !!Number(cnpj) && cnpj.toString().length === 14
            console.log('cnpjIsValid',cnpjIsValid)
            if (cnpjIsValid) {
                const { data: { status, result } } = await axios(cnpjConfig(cnpj))
                const message = validateCnpj(status, result)
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