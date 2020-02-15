const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const responseOk = require('../utils/response')
const {
	pickProducts,
	pickPrices,
	pickStyle,
	acceptSelection
	end
} = require('../utils/messages')

const autopilot = async event => {
	try {
		if (event.body.Memory) {
			const memory = JSON.parse(event.body.Memory)
			const { collected_data } = memory.twilio
			console.log('collected_data',collected_data)
			if (!collected_data) return responseOk(pickProducts)
			if (collected_data.products.status === 'complete' && !collected_data.prices)
				return responseOk(pickPrices(collected_data.products.answers))
			if (collected_data.prices.status === 'complete' && !collected_data.style) {
				return responseOk(pickStyle)
			}
			if (collected_data.style.status === 'complete' && !collected_data.selection) {
				return responseOk(acceptSelection('Absolutti, Amissima, Hush'))
			}
		}
		throw createError(404, 'Invalid Twilio Request. Memory is empty')
	} catch (error) { throw error }
}

const handler = middy(autopilot)
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }