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
                        "redirect": "https://stoic-raman-693097.netlify.com/.netlify/functions/response"
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