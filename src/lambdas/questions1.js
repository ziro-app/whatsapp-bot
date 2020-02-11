const main = require('../templates/main')

const questions1 = async (event, context, callback) => {
    const responseObject = {
        "actions": [
            {
                "collect": {
                    "name": "leads_ziro",
                    "questions": [                      
        		        {
                            "question": "2) Escolha um produto da lista abaixo para comprar\
                                            vestido de festa\
                                            saia\
                                            camisa\
                                            t-shirt\
                                            jeans\
                                            legging\
                                            shorts\
                                            colete\
                                            jaqueta\
                                            Bikini",
                            "name": "lista_produtos1",
                            "type": "Lista"
        		        },
                        {
        		            "question": "3) Escolha mais um produto",
                            "name": "lista_produtos2",
                            "type": "Lista"
        		        },
                        {
        		            "question": "4) Escolha o terceiro e último",
                            "name": "lista_produtos3",
                            "type": "Lista"
                        }
                    ],
    	            "on_complete": {
    	                "redirect": "https://whats.ziro.app/.netlify/functions/response1"
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

exports.handler = main(questions1)