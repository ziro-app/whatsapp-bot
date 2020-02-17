const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const responseOk = require('../utils/response')
const { register } = require('../utils/messages')

const autopilot = async event => {
    try {
        if (event.body.Memory) {
            console.log(event.body.Memory)
            return responseOk(register)
        }
        throw createError(404, 'Invalid Twilio Request. Memory is empty')
    } catch (error) { throw error }
}

const handler = middy(autopilot)
    .use(httpUrlencodeBodyParser())
    .use(httpErrorHandler())

module.exports = { handler }