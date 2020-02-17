const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const responseOk = require('../utils/response')

const autopilot = async event => {
	try {
		if (event.body.Memory) {
			const action = {
				"actions": [
					{
						"redirect": "https://whats.ziro.app/.netlify/functions/autopilot"
					}
				]
			}
			return responseOk(action)
		throw createError(404, 'Invalid Twilio Request. Memory is empty')
	} catch (error) { throw error }
}

const handler = middy(autopilot)
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }