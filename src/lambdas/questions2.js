const main = require('../templates/main')
const respo1 = require('../lambdas/response1')

const produtos = respo1

const questions2 = async (event, context, callback) => {
    const responseObject = {
        "actions": [
            {
                "collect": {
                    "name": "leads_ziro",
                    "questions": [
                     
                        {
        		            "question": "5) A partir de que valor você vende um(a) "+ produtos.produtos1,
                            "name": "venda_produto1",
                            "type": "Twilio.NUMBER_SEQUENCE"
                        },
                        {
        		            "question": "6) A partir de que valor você vende um(a) " ,
                            "name": "venda_produto2",
                            "type": "Twilio.NUMBER_SEQUENCE"
                        },
                        {
        		            "question": "7) A partir de que valor você vende um(a) " ,
                            "name": "venda_produto3",
                            "type": "Twilio.NUMBER_SEQUENCE"
        	            }
	                ],
    	            "on_complete": {
    	                "redirect": "https://whats.ziro.app/.netlify/functions/response2"
                    }
                }
            }
        ]
    }
    return {
        statusCode: 200,
        body: JSON.stringify(responseObject, null, 4)
    }
}

exports.handler = main(questions2)