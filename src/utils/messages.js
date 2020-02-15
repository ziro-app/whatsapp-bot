const pickFirstProductQuestion = `Olá! A Ziro está aqui para te ajudar a comprar melhor no Bom Retiro!\n
Te recomendamos as melhores marcas de acordo com o que você está procurando!\n
Conta pra gente: Qual produto deseja comprar no Bom Retiro? As opções são:\n
bijuteria\t\t\t\t\tcropped
blazer\t\t\t\t\tjaqueta
blusa\t\t\t\t\tkimono
body\t\t\t\t\tmacacao
bolsa\t\t\t\t\tmacaquinho
calca\t\t\t\t\tsaia
camisa\t\t\t\t\tshort
cardigan\t\t\t\t\ttshirt
casaco\t\t\t\t\tvestido curto
cinto\t\t\t\t\tvestido longo
conjunto\t\t\t\t\t`

exports.pickProducts = {
    "actions": [{
        "collect": {
            "name": "products",
            "questions": [
                {
		            "question": pickFirstProductQuestion,
                    "name": "productOne",
                    "type": "Lista"
		        },
                {
		            "question": "Agora, escolhe pra gente um segundo produto da lista",
                    "name": "productTwo",
                    "type": "Lista"
		        },
                {
		            "question": "Por fim, escolhe o terceiro e último produto da lista",
                    "name": "productThree",
                    "type": "Lista"
		        }
            ],
            "on_complete": {
                "redirect": "https://whats.ziro.app/.netlify/functions/autopilot"
            }
        }
    }]
}

exports.pickPrices = ({ productOne, productTwo, productThree }) => ({
    "actions": [{
        "collect": {
            "name": "prices",
            "questions": [
                {
		            "question": `Certo! Seu primeiro produto foi: ${productOne.answer}. Por qual preço você vende esse produto?`,
                    "name": "priceOne",
                    "type": "Twilio.NUMBER"
		        },{
		            "question": `Ok! Seu segundo produto foi: ${productTwo.answer}. Por qual preço você vende esse produto?`,
                    "name": "priceTwo",
                    "type": "Twilio.NUMBER"
		        },{
		            "question": `Beleza! Pra terminar, seu terceiro produto foi: ${productThree.answer}. Por qual preço você vende esse produto?`,
                    "name": "priceThree",
                    "type": "Twilio.NUMBER"
		        }
            ],
            "on_complete": {
                "redirect": "https://whats.ziro.app/.netlify/functions/autopilot"
            }
        }
    }]
})

exports.end = {
    "actions": [{
        "say": "Obrigado!"
    }]
}