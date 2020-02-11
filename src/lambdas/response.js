const main = require('../templates/main')

const response = async (event, context, callback) => {
    try {
        if (event.body.Memory) {
            const memory = JSON.parse(event.body.Memory)
            console.log(memory)
            const { first_name, clothes_type, num_clothes, shipping_country } = memory.twilio.collected_data.collect_clothes_order.answers
            const nome = first_name.answer
            const tipo = clothes_type.answer
            const roupas = num_clothes.answer
            const pais = shipping_country.answer
            console.log(nome)
            console.log(tipo)
            console.log(roupas)
            console.log(pais)
            const message = "Ok " + nome + ". Sua compra de " + roupas + " " + tipo + " esta confirmada. Entregaremos no " + pais
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