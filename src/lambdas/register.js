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
            console.log(JSON.parse(event.body.Memory))
            if (!event.body.Memory.twilio.collected_data) return responseOk(register)
            const cnpj = event.body.Memory.twilio.collected_data.register.answers.register.answer
            const { data: { valueRanges } } = await axios(cnpjConfig(cnpj))
            return responseOk(register)
        }
        throw createError(404, 'Invalid Twilio Request. Memory is empty')
    } catch (error) { throw error }
}

const handler = middy(autopilot)
    .use(httpUrlencodeBodyParser())
    .use(httpErrorHandler())

module.exports = { handler }