const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const responseOk = require('../utils/response')
const {
	pickProducts,
	pickPrices,
	end
} = require('../utils/messages')

const autopilot = async event => {
	try {
		if (event.body.Memory) {
			const memory = JSON.parse(event.body.Memory)
			const { collected_data } = memory.twilio
			console.log('collected_data',collected_data)
			if (!collected_data) return responseOk(pickProducts)
			if (collected_data.products.answers) {
				const { productOne, productTwo, productThree } = collected_data.products.answers
				if (productOne && productTwo && productThree)
					return responseOk(pickPrices(productOne, productTwo, productThree))

			}
			if (collected_data.prices.answers) {
				const { priceOne, priceTwo, priceThree } = collected_data.prices.answers
				if (priceOne && priceTwo && priceThree) return responseOk(end)
			}
		}
		throw createError(404, 'Invalid Twilio Request. Memory is empty')
	} catch (error) { throw error }
}

const handler = middy(autopilot)
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }