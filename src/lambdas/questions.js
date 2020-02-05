const main = require('../templates/main')


// Descrever objetivo do endpoint

const questions = async (event, context, callback) => {
    console.log(event)
    const responseObject = {
        "actions": [
            {
                "collect": {
                    "name": "Ziro Leads",
                    "questions": [
                        {
		            "question": "Como você se chama?",
                            "name": "first_name",
                            "type": "Twilio.FIRST_NAME"
		        },
		        {
		            "question": "Qual a  quantidade minima de  de roupa você compra?",
                            "name": "clothes_type",
                            "type": "Twilio.NUMBER"
		        },
                        {
		            "question": "Quantos você gostaria de pedir agora ??",
                            "name": "num_clothes",
                            "type": "Twilio.NUMBER"
		        },
                        {
		            "question": "Em que país está o seu endereço de entrega?",
                            "name": "shipping_country",
                            "type": "Twilio.COUNTRY"
	                }
	            ],
	            "on_complete": {
	                "redirect": "http://62be00a4.ngrok.io/.netlify/functions/response"
                    }
                }
            }
        ]

        
    };
           
    return {
        statusCode: 200,
        body: JSON.stringify(responseObject, null, 4)
    }
    
}


exports.handler = main(questions)
