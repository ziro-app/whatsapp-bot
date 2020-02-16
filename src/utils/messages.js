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
                    "type": "Produtos"
		        },
                {
		            "question": "Agora, escolhe pra gente um segundo produto da lista",
                    "name": "productTwo",
                    "type": "Produtos"
		        },
                {
		            "question": "Por fim, escolhe o terceiro e último produto da lista",
                    "name": "productThree",
                    "type": "Produtos"
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
		            "question": `Certo! Seu primeiro produto foi: *${productOne.answer}*. Por qual preço você vende esse produto?\nObs.: Não use decimal`,
                    "name": "priceOne",
                    "type": "Twilio.NUMBER"
		        },{
		            "question": `Ok! Seu segundo produto foi: *${productTwo.answer}*. Por qual preço você vende esse produto?\nObs.: Não use decimal`,
                    "name": "priceTwo",
                    "type": "Twilio.NUMBER"
		        },{
		            "question": `Beleza! Pra terminar, seu terceiro produto foi: *${productThree.answer}*. Por qual preço você vende esse produto?\nObs.: Não use decimal`,
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

const pickStyleQuestion = `Ok! Estamos quase terminando!\n
Agora precisamos saber acerca do estilo da sua loja\n
Dentre as opções abaixo, qual melhor representa o estilo da sua loja?\n
Casual
Evangelico
Festa
Fitness
Jeans
Romantico
Sexy
Social
Sofisticado
`

exports.pickStyle = {
    "actions": [{
        "collect": {
            "name": "style",
            "questions": [
                {
		            "question": pickStyleQuestion,
                    "name": "style",
                    "type": "Estilos"
		        }
            ],
            "on_complete": {
                "redirect": "https://whats.ziro.app/.netlify/functions/autopilot"
            }
        }
    }]
}

displaySuppliers = (responses, selectionOne, selectionTwo, selectionThree) => `
*${response[0]}*
${selectionOne[0].nome}
${selectionOne[0].insta}
${selectionOne[1].nome}
${selectionOne[1].insta}
${selectionOne[2].nome}
${selectionOne[2].insta}
*${response[1]}*
${selectionTwo[0].nome}
${selectionTwo[0].insta}
${selectionTwo[1].nome}
${selectionTwo[1].insta}
${selectionTwo[2].nome}
${selectionTwo[2].insta}
*${response[2]}*
${selectionThree[0].nome}
${selectionThree[0].insta}
${selectionThree[1].nome}
${selectionThree[1].insta}
${selectionThree[2].nome}
${selectionThree[2].insta}
`

exports.acceptSelection = selection => ({
    "actions": [{
        "collect": {
            "name": "selection",
            "questions": [
                {
		            "question": `Pronto! Separamos para você as seguintes marcas:\n${displaySuppliers(selection)}\nO que achou? Gostou da seleção?`,
                    "name": "selection",
                    "type": "SimNao"
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
        "say": "Obrigado pelo seu tempo e por escolher a Ziro! Entraremos em contato em breve!"
    }]
}