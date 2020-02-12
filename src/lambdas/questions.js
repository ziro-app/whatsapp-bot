const main = require('../templates/main')

const questions = async (event, context, callback) => {
    const responseObject = {
        "actions": [
            {
                "collect": {
                    "name": "leads_ziro",
                    "questions": [
                        {
        		            "question": "1) Olá,                                                                                                                                                             Digite seu cnpj para sabermos se podemos atendê-lo",
                            "name": "cnpj_cliente",
                            "type": "Twilio.NUMBER_SEQUENCE"
        		        },
        		      
	                ],
    	            "on_complete": {
    	                "redirect": "https://whats.ziro.app/.netlify/functions/response"
                    }
                }
            },
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
            },
            {
                "collect": {
                    "name": "leads_ziro",
                    "questions": [
                     
                        {
        		            "question": "5) A partir de que valor você vende um(a) " ,
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
            },
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

exports.handler = main(questions)