const main = require('../templates/main')

const response3 = async (event, context, callback) => {
    try {
        if (event.body.Memory) {
            const memory = JSON.parse(event.body.Memory)
            console.log(memory)
             memory.twilio.collected_data.leads_ziro.answers
            
            const horarioContato= memory.twilio.collected_data.leads_ziro.answers.horario_contato.answer
            
            console.log(horarioContato)
            
            const message = "Obrigado!! Logo um dos nossos colaboradores entrará em contato"
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

exports.handler = main(response3)