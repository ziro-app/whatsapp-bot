const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')
const responseOk = require('../utils/response')
const prepareData = require('../utils/prepareData')
const model = require('../model/index')
const {
	pickProducts,
	pickPrices,
	pickStyle,
	acceptSelection,
	end
} = require('../utils/messages')

const autopilot = async event => {
	try {
		if (event.body.Memory) {
			const memory = JSON.parse(event.body.Memory)
			const { collected_data } = memory.twilio
			if (collected_data.products.status !== 'complete') return responseOk(pickProducts)
			if (collected_data.products.status === 'complete' && !collected_data.prices)
				return responseOk(pickPrices(collected_data.products.answers))
			if (collected_data.prices.status === 'complete' && !collected_data.style) {
				return responseOk(pickStyle)
			}
			if (collected_data.style.status === 'complete' && !collected_data.selection) {
				const [products, prices, style] = prepareData(
					collected_data.products.answers,
					collected_data.prices.answers,
					collected_data.style.answers
				)
				const [selectionOne, selectionTwo, selectionThree] = await model(products, prices, style)
				console.log(selectionOne)
				console.log(selectionTwo)
				console.log(selectionThree)
				return responseOk(acceptSelection([products, selectionOne, selectionTwo, selectionThree]))
			}
			return responseOk(end)
		}
		throw createError(404, 'Invalid Twilio Request. Memory is empty')
	} catch (error) { throw error }
}

const handler = middy(autopilot)
	.use(httpUrlencodeBodyParser())
	.use(httpErrorHandler())

module.exports = { handler }

// let event = {}
// event.body = {}
// event.body.Memory = JSON.stringify({
// 	"twilio": {
// 		"collected_data": {
// 			"prices": {
// 				"answers": {
// 					"priceOne": {
// 						"confirm_attempts": 0,
// 						"answer": "10",
// 						"filled": true,
// 						"type": "Twilio.NUMBER",
// 						"confirmed": false,
// 						"validate_attempts": 1,
// 						"attempts": 1
// 					},
// 					"priceTwo": {
// 						"confirm_attempts": 0,
// 						"answer": "10",
// 						"filled": true,
// 						"type": "Twilio.NUMBER",
// 						"confirmed": false,
// 						"validate_attempts": 1,
// 						"attempts": 1
// 					},
// 					"priceThree": {
// 						"answer": "10",
// 						"type": "Twilio.NUMBER",
// 						"filled": true,
// 						"attempts": 1,
// 						"validate_attempts": 1,
// 						"confirm_attempts": 0,
// 						"confirmed": false
// 					}
// 				},
// 				"date_completed": "2020-02-16T03:14:36Z",
// 				"date_started": "2020-02-16T03:14:23Z",
// 				"status": "complete"
// 			},
// 			"products": {
// 				"answers": {
// 					"productTwo": {
// 						"confirm_attempts": 0,
// 						"answer": "Calca",
// 						"filled": true,
// 						"type": "Produtos",
// 						"confirmed": false,
// 						"validate_attempts": 1,
// 						"attempts": 1
// 					},
// 					"productThree": {
// 						"confirm_attempts": 0,
// 						"answer": "Camisa",
// 						"filled": true,
// 						"type": "Produtos",
// 						"confirmed": false,
// 						"validate_attempts": 1,
// 						"attempts": 1
// 					},
// 					"productOne": {
// 						"confirm_attempts": 0,
// 						"answer": "Body",
// 						"filled": true,
// 						"type": "Produtos",
// 						"confirmed": false,
// 						"validate_attempts": 1,
// 						"attempts": 1
// 					}
// 				},
// 				"date_completed": "2020-02-16T03:14:22Z",
// 				"date_started": "2020-02-16T03:14:06Z",
// 				"status": "complete"
// 			},
// 			"style": {
// 				"answers": {
// 					"style": {
// 						"confirm_attempts": 0,
// 						"answer": "Social",
// 						"filled": true,
// 						"type": "Estilos",
// 						"confirmed": false,
// 						"validate_attempts": 1,
// 						"attempts": 1
// 					}
// 				},
// 				"date_completed": "2020-02-16T03:14:22Z",
// 				"date_started": "2020-02-16T03:14:06Z",
// 				"status": "complete"
// 			}
// 		}
// 	}
// })

// autopilot(event)