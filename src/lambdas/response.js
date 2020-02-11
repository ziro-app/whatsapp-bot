const main = require('../templates/main')

const response = async (event, context, callback) => {
    try {
        if (event.body.Memory) {
            const memory = JSON.parse(event.body.Memory)
            console.log(memory)
            const { cnpj_cliente, lista_produtos1, lista_produtos2, lista_produtos3, venda_produto1, venda_produto2, venda_produto3 } = memory.twilio.collected_data.leads_ziro.answers
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
            const message = cnpj + "  " + produtos1 + " " + produtos2 + "  " + produtos3 
            const responseObject = {
                "actions": [
                    {
                        "say": {
                            "speech": message
                        } 
                    }
                ]
            }
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