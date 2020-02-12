const main = require('../templates/main')

const response = async (event, context, callback) => {
    try {
        if (event.body.Memory) {
            const memory = JSON.parse(event.body.Memory)
            console.log(memory)
            
            const cnpj = memory.twilio.collected_data.leads_ziro.answers.cnpj_cliente.answer
            console.log(cnpj)
            console.log(memory.twilio.collected_data.leads_ziro)
            
            const message = "Seu CNPJ é "+cnpj+ " para prosseguir digite ok!" 
            const responseObject = {
                "actions": [
                    {
                        "collect": {
                            "name": "leads_ziro",
                            "questions": [
                                {
                                    "question": "2) ok, obrigado!! Escolha um produto da lista abaixo para comprar",
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
                                "redirect": "https://stoic-raman-693097.netlify.com/.netlify/functions/response"
                            }
                        }
                    }
                ]


            }
            console.log(cnpj)
          	return {
                statusCode: 200,
                body: JSON.stringify(responseObject, null, 4)
            }
        } else {
            return {
                statusCode: 200,
                body: 'Request feito no browser'
            }
        }
    } catch (error) {
        console.log(error)
        throw { statusCode: 500, body: error }
    }
}

exports.handler = main(response)
