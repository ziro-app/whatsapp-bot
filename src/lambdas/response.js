const main = require('../templates/main')
const request = require('../templates/request')
const querystring = require('querystring')


// Descrever objetivo do endpoint

const response = async (event, context, callback) => {
        
        const memory = querystring.parse(event.body).Memory
        

        let responseObject = {};
        
        console.log(memory)

        let first_name = memory.twilio.collected_data.collect_clothes_order.answers.first_name.answer;
        let clothes_type = memory.twilio.collected_data.collect_clothes_order.answers.clothes_type.answer;
        let num_clothes = memory.twilio.collected_data.collect_clothes_order.answers.num_clothes.answer;
    
        console.log("First name: "+first_name);
        console.log("Clothes type: "+clothes_type);
        console.log("Num clothes: "+num_clothes);
    
        let message = "Ok "+first_name+". Your order for "+num_clothes+" "+clothes_type+" is now confirmed. Thank you for ordering with us";
        responseObject = {"actions":[
            { "say": { "speech": message } }
        ]};   
          
  	return {
        statusCode: 200,
        body: JSON.stringify(responseObject, null, 4)
    }

}

exports.handler = main(response)