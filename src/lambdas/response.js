const main = require('../templates/main')
const request = require('../templates/request')
const querystring = require('querystring')
const twilio = require('twilio')


// Descrever objetivo do endpoint

const response = async (event, context, callback) => {
    
        
    const memory = JSON.parse(event.body.Memory)

    console.log(memory)
    
    let responseObject = {};

    const {first_name,clothes_type,num_clothes,shipping_country } = memory.twilio.collected_data.collect_clothes_order.answers

    const nome = first_name.answer
    const tipo = clothes_type.answer;
    const roupas = num_clothes.answer
    const pais = shipping_country.answer;

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