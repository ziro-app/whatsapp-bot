const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const { productTypes, pickSecondProduct} = require('../utils/messages')

const autopilot = async event => {
	try {
		if (event.body.Memory) {
			const memory = JSON.parse(event.body.Memory)
			console.log(memory)
			const { collected_data } = memory.twilio
			console.log(collected_data)
			if (!collected_data) {
				return {
					headers: { 'Content-Type': 'application/json' },
					statusCode: 200,
					body: JSON.stringify(productTypes, null, 4)
				}
			}
			return {
				headers: { 'Content-Type': 'application/json' },
				statusCode: 200,
				body: JSON.stringify(pickSecondProduct, null, 4)
			}
		}
		return {
			headers: { 'Content-Type': 'application/json' },
			statusCode: 200,
			body: JSON.stringify('ok', null, 4)
		}
	} catch (error) { throw error }
}

const handler = middy(autopilot)
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }