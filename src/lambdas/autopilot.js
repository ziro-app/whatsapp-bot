const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const responseOk = require('../utils/response')
const {
	pickFirstProduct,
	pickSecondProduct,
	pickThirdProduct
} = require('../utils/messages')

const autopilot = async event => {
	try {
		if (event.body.Memory) {
			const memory = JSON.parse(event.body.Memory)
			console.log('memory',memory)
			const { collected_data } = memory.twilio
			console.log('collected_data',collected_data)
			if (!collected_data) return responseOk(pickFirstProduct)
			if (collected_data.product_types.answers) {
				const { productThree, productTwo, productOne } = collected_data.product_types.answers
				if (productThree) return responseOk('Obrigado')
				if (productTwo) return responseOk(pickThirdProduct)
				if (productOne) return responseOk(pickSecondProduct)
			}
		}
		throw createError(404, 'Invalid Twilio Request')
	} catch (error) { throw error }
}

const handler = middy(autopilot)
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }