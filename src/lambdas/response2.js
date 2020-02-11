const main = require('../templates/main')

const response2 = async (event, context, callback) => {
    try {
        if (event.body.Memory) {
            const memory = JSON.parse(event.body.Memory)
            console.log(memory)
            const {venda_produto1, venda_produto2, venda_produto3 } = memory.twilio.collected_data.leads_ziro.answers
            
            const vendaprod1 = venda_produto1.answer
            const vendaprod2 = venda_produto2.answer
            const vendaprod3 = venda_produto3.answer
           
            console.log(vendaprod1)
            console.log(vendaprod2)
            console.log(vendaprod3)
            const message = "Os preços informados foram" +vendaprod1+ " " +vendaprod2+ " " +vendaprod3+ "segue algumas opções de marca"
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

exports.handler = main(response2)