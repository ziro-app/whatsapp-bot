const middy = require('@middy/core')
const httpUrlencodeBodyParser = require('@middy/http-urlencode-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const createError = require('http-errors')

const autopilot = async event => {
	try {
		console.log(event)
		if (event.body.Memory) {
			const memory = JSON.parse(event.body.Memory)
			console.log(memory)
			const actions = {
			    "actions": [{
			        "collect": {
			            "name": "product_types",
			            "questions": [
			                {
					            "question": `Qual produto deseja comprar no Bom Retiro? As opções são: \n
									bijuteria
									blazer
									blusa
									body
									bolsa
									calca
									camisa
									cardigan
									kimono
									casaco
									cinto
									conjunto
									cropped
									jaqueta
									macacao
									macaquinho
									short
									saia
									tshirt
									vestido curto
									vestido longo
					            `,
			                    "name": "product",
			                    "type": "Lista"
					        }
			            ],
			            "on_complete": {
			                "redirect": "https://whats.ziro.app/.netlify/functions/autopilot"
			            }
			        }
			    }]
			}
			return {
				headers: { 'Content-Type': 'application/json' },
				statusCode: 200,
				body: JSON.stringify(actions, null, 4)
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