const main = require('../templates/main')

const response1 = async (event, context, callback) => {
    try {
        if (event.body.Memory) {
            const memory = JSON.parse(event.body.Memory)
            console.log(memory)
            const {lista_produtos1, lista_produtos2, lista_produtos3,} = memory.twilio.collected_data.leads_ziro.answers
            
            const produtos1 = lista_produtos1.answer
            const produtos2 = lista_produtos2.answer
            const produtos3 = lista_produtos3.answer
        
            console.log(produtos1)
            console.log(produtos2)
            console.log(produtos3)
           
            const message = "voce escolheu "+ produtos1 + " " +produtos2+ " " +produtos3+ "vamos continuar?"
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

exports.handler = main(response1)