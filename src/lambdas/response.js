const main = require('../templates/main')

const response = async (event, context, callback) => {
    try {
        if (event.body.Memory) {
            const memory = JSON.parse(event.body.Memory)
            console.log(memory)
                        
            const {vendaprod1, vendaprod2, vendaprod3, cnpj_cliente, lista_produtos1, lista_produtos2, lista_produtos3,} = memory.twilio.collected_data.leads_ziro.answers
            const cnpj = cnpj_cliente.answer
            const produtos1 = lista_produtos1.answer
            const produtos2 = lista_produtos2.answer
            const produtos3 = lista_produtos3.answer
            const vendaprod1 = venda_produto1.answer
            const vendaprod2 = venda_produto2.answer
            const vendaprod3 = venda_produto3.answer
                     
            console.log(cnpj)
            console.log(produtos1)
            console.log(produtos2)
            console.log(produtos3)
            console.log(vendaprod1)
            console.log(vendaprod2)
            console.log(vendaprod3)

            console.log(memory.twilio.collected_data.leads_ziro)
            
            const responseObject = {
                "actions": [
                    {
                        "collect": {
                            "name": "leads_ziro",
                            "questions": [
                                {
                                    "question": "2) ok, obrigado!! Escolha um produto da lista para comprar -- camisa -- shorts -- colete -- jeans -- t-shirt -- jaqueta -- bikini ",
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
                                "redirect": "https://whats.ziro.app/.netlify/functions/response"
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
