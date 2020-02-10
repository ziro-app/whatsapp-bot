const main = require('../templates/main')
const request = require('../templates/request')
const querystring = require('querystring')
const twilio = require('twilio')


// Descrever objetivo do endpoint

const response = async (event, context, callback) => {
    
        
    const memory = JSON.parse(event.body.Memory)

    console.log(memory)
    
    let responseObject = {};
        
    const nome =  memory.twilio.collected_data.collect_clothes_order.answers.first_name.answer
    const tipo = memory.twilio.collected_data.collect_clothes_order.answers.clothes_type.answer;
    const roupas = memory.twilio.collected_data.collect_clothes_order.answers.num_clothes.answer
    const pais = memory.twilio.collected_data.collect_clothes_order.answers.shipping_country.answer;

    console.log(nome)
    console.log(tipo)
    console.log(roupas)
    console.log(pais)

    const message = "Ok " + nome + ". Sua compra foi de " + roupas + " " + tipo+ " esta confirmada. entregaremos no " + pais;
    
    responseObject = {
        "actions": [ 
            { "say": 
                { "speech": message } 
            }
        ]
    }   
         
  	return {
        statusCode: 200,
        body: JSON.stringify(responseObject, null, 4)
    }

}

exports.handler = main(response)