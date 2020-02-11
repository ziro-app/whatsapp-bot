const main = require('../templates/main')

const questions2 = async (event, context, callback) => {
    const responseObject = {
        "actions": [
            {
                "collect": {
                    "name": "leads_ziro",
                    "questions": [
                     
                        {
        		            "question": "Perfeito, qual é o melhor horário para entrarmos em contato? " ,
                            "name": "horario_contato",
                            "type": "Twilio.TIME"
                        }
                    ],
    	            "on_complete": {
    	                "redirect": "https://whats.ziro.app/.netlify/functions/response3"
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