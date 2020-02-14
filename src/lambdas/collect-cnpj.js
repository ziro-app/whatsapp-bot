const main = require('../templates/main')

const collectCnpj = async (event, context, callback) => {
    const responseObject = {
        "actions": [
            {
                "collect": {
                    "name": "leads_ziro",
                    "questions": [
                        {
                        "question": "1) Olá, Digite seu cnpj para sabermos se podemos atendê-lo",
                        "name": "cnpj_cliente",
                        "type": "Twilio.NUMBER_SEQUENCE"
                    }],
                    "on_complete": {
                        "redirect": "https://whats.ziro.app/.netlify/functions/response"
                    }
                }
            }
       ]
    }
    return {
        statusCode: 200,
        body: JSON.stringify(responseObject, null, 4)
    }
}

exports.handler = main(collectCnpj)

//AQUI ESTÃO O RESTANTE DAS PERGUNTAS

// const responseObject = {
//     "actions": [
//         {
//             "collect": {
//                 "name": "leads_ziro",
//                 "questions": [
//                     {
//                         "question": "5) A partir de quanto você vende um(a)"+ produto1,
//                         "name": "venda_produto1",
//                         "type": "Lista"
//                     },
//                     {
//                         "question": "6) A partir de quanto você vende um(a)"+ produto2,
//                         "name": "venda_produto2",
//                         "type": "Lista"
//                     },
//                     {
//                         "question": "7) A partir de quanto você vende um(a)"+ produto3,
//                         "name": "venda_produto3",
//                         "type": "Lista"
//                     }
//                 ],
//                 "on_complete": {
//                     "redirect": "https://whats.ziro.app/.netlify/functions/response"
//                 }
//             }
//         }
//     ]
// }