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
