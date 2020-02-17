const validProducts = [
    'bijuteria',
    'cropped',
    'blazer',
    'jaqueta',
    'blusa',
    'kimono',
    'body',
    'macacao',
    'bolsa',
    'macaquinho',
    'calca',
    'saia',
    'camisa',
    'short',
    'cardigan',
    'tshirt',
    'casaco',
    'vestido curto',
    'cinto',
    'vestido longo',
    'conjunto'
]

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
                    "type": "Produtos",
                    "validate": {
                        "allowed_values": {
                            "list": validProducts
                        },
                        "on_failure": {
                            "messages": [
                                {
                                    "say": "Não entendi. Digita por favor exatamente como aparece na lista acima, assim consigo te ajudar, ok?"
                                },
                                {
                                    "say": "Ainda não entendi. Pode tentar de novo, mas se quiser reiniciar lá do começo, é só mandar uma mensagem qualquer"
                                }
                            ],
                            "repeat_question": true
                        },
                        "max_attempts": {
                            "redirect": "https://whats.ziro.app/.netlify/functions/autopilot",
                            "num_attempts": 2
                        }
                    }
		        },
                {
		            "question": "Agora, escolhe pra gente um segundo produto da lista",
                    "name": "productTwo",
                    "type": "Produtos",
                    "validate": {
                        "allowed_values": {
                            "list": validProducts
                        },
                        "on_failure": {
                            "messages": [
                                {
                                    "say": "Não entendi. Digita por favor exatamente como aparece na lista acima, assim consigo te ajudar, ok?"
                                },
                                {
                                    "say": "Ainda não entendi. Pode tentar de novo, mas se quiser reiniciar lá do começo, é só mandar uma mensagem qualquer"
                                }
                            ],
                            "repeat_question": true
                        },
                        "max_attempts": {
                            "redirect": "https://whats.ziro.app/.netlify/functions/autopilot",
                            "num_attempts": 2
                        }
                    }
		        },
                {
		            "question": "Por fim, escolhe o terceiro e último produto da lista",
                    "name": "productThree",
                    "type": "Produtos",
                    "validate": {
                        "allowed_values": {
                            "list": validProducts
                        },
                        "on_failure": {
                            "messages": [
                                {
                                    "say": "Não entendi. Digita por favor exatamente como aparece na lista acima, assim consigo te ajudar, ok?"
                                },
                                {
                                    "say": "Ainda não entendi. Pode tentar de novo, mas se quiser reiniciar lá do começo, é só mandar uma mensagem qualquer"
                                }
                            ],
                            "repeat_question": true
                        },
                        "max_attempts": {
                            "redirect": "https://whats.ziro.app/.netlify/functions/autopilot",
                            "num_attempts": 2
                        }
                    }
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
                    "type": "Twilio.NUMBER",
                    "validate": {
                        "on_failure": {
                            "messages": [
                                {
                                    "say": "Não entendi. Digita por favor somente números, sem vírgula nem ponto, ok?"
                                },
                                {
                                    "say": "Ainda não entendi. Pode tentar de novo, mas se quiser reiniciar lá do começo, é só mandar uma mensagem qualquer"
                                }
                            ],
                            "repeat_question": true
                        },
                        "max_attempts": {
                            "redirect": "https://whats.ziro.app/.netlify/functions/autopilot",
                            "num_attempts": 2
                        }
                    }
		        },{
		            "question": `Ok! Seu segundo produto foi: *${productTwo.answer}*. Por qual preço você vende esse produto?\nObs.: Não use decimal`,
                    "name": "priceTwo",
                    "type": "Twilio.NUMBER",
                    "validate": {
                        "on_failure": {
                            "messages": [
                                {
                                    "say": "Não entendi. Digita por favor somente números, sem vírgula nem ponto, ok?"
                                },
                                {
                                    "say": "Ainda não entendi. Pode tentar de novo, mas se quiser reiniciar lá do começo, é só mandar uma mensagem qualquer"
                                }
                            ],
                            "repeat_question": true
                        },
                        "max_attempts": {
                            "redirect": "https://whats.ziro.app/.netlify/functions/autopilot",
                            "num_attempts": 2
                        }
                    }
		        },{
		            "question": `Beleza! Pra terminar, seu terceiro produto foi: *${productThree.answer}*. Por qual preço você vende esse produto?\nObs.: Não use decimal`,
                    "name": "priceThree",
                    "type": "Twilio.NUMBER",
                    "validate": {
                        "on_failure": {
                            "messages": [
                                {
                                    "say": "Não entendi. Digita por favor somente números, sem vírgula nem ponto, ok?"
                                },
                                {
                                    "say": "Ainda não entendi. Pode tentar de novo, mas se quiser reiniciar lá do começo, é só mandar uma mensagem qualquer"
                                }
                            ],
                            "repeat_question": true
                        },
                        "max_attempts": {
                            "redirect": "https://whats.ziro.app/.netlify/functions/autopilot",
                            "num_attempts": 2
                        }
                    }
		        }
            ],
            "on_complete": {
                "redirect": "https://whats.ziro.app/.netlify/functions/autopilot"
            }
        }
    }]
})

const validStyles = [
    'Casual',
    'Evangelico',
    'Festa',
    'Fitness',
    'Jeans',
    'Romantico',
    'Sexy',
    'Social',
    'Sofisticado'
]

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
                    "type": "Estilos",
                    "validate": {
                        "allowed_values": {
                            "list": validStyles
                        },
                        "on_failure": {
                            "messages": [
                                {
                                    "say": "Não entendi. Digita por favor exatamente como aparece na lista acima, assim consigo te ajudar, ok?"
                                },
                                {
                                    "say": "Ainda não entendi. Pode tentar de novo, mas se quiser reiniciar lá do começo, é só mandar uma mensagem qualquer"
                                }
                            ],
                            "repeat_question": true
                        },
                        "max_attempts": {
                            "redirect": "https://whats.ziro.app/.netlify/functions/autopilot",
                            "num_attempts": 2
                        }
                    }
		        }
            ],
            "on_complete": {
                "redirect": "https://whats.ziro.app/.netlify/functions/autopilot"
            }
        }
    }]
}

const displaySuppliers = selection => {
    const [responses, selectionOne, selectionTwo, selectionThree] = selection
    const [responseOne, responseTwo, responseThree] = responses
    const titleOne = responseOne.toUpperCase()
    const titleTwo = responseTwo.toUpperCase()
    const titleThree = responseThree.toUpperCase()
    const selectionOneEmpty = selectionOne.length === 0 ? 'Nenhuma marca encontrada nesse preço' : ''
    const selectionTwoEmpty = selectionTwo.length === 0 ? 'Nenhuma marca encontrada nesse preço' : ''
    const selectionThreeEmpty = selectionThree.length === 0 ? 'Nenhuma marca encontrada nesse preço' : ''
    const [selectionOneBrandOne, selectionOneBrandTwo, selectionOneBrandThree] = selectionOne
    const selectionBrandOneNameOne = selectionOneBrandOne ? selectionOneBrandOne.nome : ''
    const selectionBrandOneNameTwo = selectionOneBrandTwo ? selectionOneBrandTwo.nome : ''
    const selectionBrandOneNameThree = selectionOneBrandThree ? selectionOneBrandThree.nome : ''
    const selectionBrandOneInstaOne = selectionOneBrandOne ? `https://instagram.com/${selectionOneBrandOne.insta}` : ''
    const selectionBrandOneInstaTwo = selectionOneBrandTwo ? `https://instagram.com/${selectionOneBrandTwo.insta}` : ''
    const selectionBrandOneInstaThree = selectionOneBrandThree ? `https://instagram.com/${selectionOneBrandThree.insta}` : ''
    const [selectionTwoBrandOne, selectionTwoBrandTwo, selectionTwoBrandThree] = selectionTwo
    const selectionBrandTwoNameOne = selectionTwoBrandOne ? selectionTwoBrandOne.nome : ''
    const selectionBrandTwoNameTwo = selectionTwoBrandTwo ? selectionTwoBrandTwo.nome : ''
    const selectionBrandTwoNameThree = selectionTwoBrandThree ? selectionTwoBrandThree.nome : ''
    const selectionBrandTwoInstaOne = selectionTwoBrandOne ? `https://instagram.com/${selectionTwoBrandOne.insta}` : ''
    const selectionBrandTwoInstaTwo = selectionTwoBrandTwo ? `https://instagram.com/${selectionTwoBrandTwo.insta}` : ''
    const selectionBrandTwoInstaThree = selectionTwoBrandThree ? `https://instagram.com/${selectionTwoBrandThree.insta}` : ''
    const [selectionThreeBrandOne, selectionThreeBrandTwo, selectionThreeBrandThree] = selectionThree
    const selectionBrandThreeNameOne = selectionThreeBrandOne ? selectionThreeBrandOne.nome : ''
    const selectionBrandThreeNameTwo = selectionThreeBrandTwo ? selectionThreeBrandTwo.nome : ''
    const selectionBrandThreeNameThree = selectionThreeBrandThree ? selectionThreeBrandThree.nome : ''
    const selectionBrandThreeInstaOne = selectionThreeBrandOne ? `https://instagram.com/${selectionThreeBrandOne.insta}` : ''
    const selectionBrandThreeInstaTwo = selectionThreeBrandTwo ? `https://instagram.com/${selectionThreeBrandTwo.insta}` : ''
    const selectionBrandThreeInstaThree = selectionThreeBrandThree ? `https://instagram.com/${selectionThreeBrandThree.insta}` : ''
    const blockOne = selectionOneEmpty ? `${selectionOneEmpty}` :
`
${selectionBrandOneNameOne}
${selectionBrandOneInstaOne}
${selectionBrandOneNameTwo}
${selectionBrandOneInstaTwo}
${selectionBrandOneNameThree}
${selectionBrandOneInstaThree}
`
    const blockTwo = selectionTwoEmpty ? `${selectionTwoEmpty}` :
`
${selectionBrandTwoNameOne}
${selectionBrandTwoInstaOne}
${selectionBrandTwoNameTwo}
${selectionBrandTwoInstaTwo}
${selectionBrandTwoNameThree}
${selectionBrandTwoInstaThree}
`    
    const blockThree = selectionThreeEmpty ? `${selectionThreeEmpty}` :
`
${selectionBrandThreeNameOne}
${selectionBrandThreeInstaOne}
${selectionBrandThreeNameTwo}
${selectionBrandThreeInstaTwo}
${selectionBrandThreeNameThree}
${selectionBrandThreeInstaThree}
`
    return `
*${titleOne}*
${blockOne}
\n*${titleTwo}*
${blockTwo}
\n*${titleThree}*
${blockThree}
`
}

const validAnswers = [
    'Sim',
    'Si',
    'S',
    'sim',
    'si',
    's',
    'Não',
    'No',
    'N',
    'não',
    'no',
    'n',
    'Nao',
    'Na',
    'nao',
    'na',
    'gostei',
    'Gostei',
    'Não Gostei',
    'Não gostei',
    'Nao gostei',
    'Nao Gostei'
]

exports.acceptSelection = selection => ({
    "actions": [{
        "collect": {
            "name": "selection",
            "questions": [
                {
		            "question": `Pronto! Separamos para você as seguintes marcas:\n${displaySuppliers(selection)}\nO que achou? Gostou da seleção?`,
                    "name": "selection",
                    "type": "SimNao",
                    "validate": {
                        "allowed_values": {
                            "list": validAnswers
                        },
                        "on_failure": {
                            "messages": [
                                {
                                    "say": "Não entendi. Pode mandar simplesmente Sim ou Não!"
                                },
                                {
                                    "say": "Ainda não entendi. Pode tentar de novo, mas se quiser reiniciar lá do começo, é só mandar uma mensagem qualquer"
                                }
                            ],
                            "repeat_question": true
                        }
                    }
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