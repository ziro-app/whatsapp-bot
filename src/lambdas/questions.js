const main = require('../templates/main')


// Descrever objetivo do endpoint

const questions = async (event, context, callback) => {
    console.log(event)
    const responseObject = {
        "actions": [
            {
                "collect": {
                    "name": "collect_clothes_order",
                    "questions": [
                        {
		            "question": "What is your first name?",
                            "name": "first_name",
                            "type": "Twilio.FIRST_NAME"
		        },
		        {
		            "question": "What type of clothes would you like?",
                            "name": "clothes_type",
                            "type": "Twilio.NUMBER"
		        },
                        {
		            "question": "How many would you like to order?",
                            "name": "num_clothes",
                            "type": "Twilio.NUMBER"
		        },
                        {
		            "question": "What country is your shipping address in?",
                            "name": "shipping_country",
                            "type": "Twilio.COUNTRY"
	                }
	            ],
	            "on_complete": {
	                "redirect": "https://replace-with-your-function.twil.io/collect"
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
