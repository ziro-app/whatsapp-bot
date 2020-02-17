const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const axios = require('axios')
const responseOk = require('../utils/response')
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
            if (cnpjIsValid) {
                const { data: { status, result } } = await axios(cnpjConfig(cnpj))
                console.log('status',status)
                console.log('result',result)
                return responseOk(endRegister)    
            }
            return responseOk(endRegister)
        }
        throw createError(404, 'Invalid Twilio Request. Memory is empty')
    } catch (error) { throw error }
}

const handler = middy(autopilot)
    .use(httpUrlencodeBodyParser())
    .use(httpErrorHandler())

module.exports = { handler }