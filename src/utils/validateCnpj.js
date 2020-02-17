const validateCnpj = (status, cnpjData) => {
	if (status) {
		const cnaes = [...cnpjData.atividades_secundarias, cnpjData.atividade_principal].map(({ code }) => code)
		const cnaeIsValid = !!cnaes.filter(code => code === '47.81-4-00').pop()
		if (!cnaeIsValid) return 'Seu CNPJ não tem CNAE 4781-4/00 (Ramo Vestuário). Por isso não podemos atendê-lo 😔.\n Se achar que essa informação está errada, não se preocupe. Pode mandar uma mensagem para esse número de Whatsapp +55 (11) 3334-0920 e nossa equipe vai te ajudar com seu cadastro!'
		const isActive = cnpjData.situacao === 'ATIVA'
		if (!isActive) return 'Seu CNPJ não está ativo. Por isso não podemos atendê-lo 😔.\n Se achar que essa informação está errada, não se preocupe. Pode mandar uma mensagem para esse número de Whatsapp +55 (11) 3334-0920 e nossa equipe vai te ajudar com seu cadastro!'
		return 'OK! Validamos seu CNPJ e podemos atendê-lo!🎉🎉 Agora é só aguardar que entraremos em contato com você o quanto antes! Você também pode mandar uma mensagem para esse número de Whatsapp +55 (11) 3334-0920 se estiver com pressa'
	}
	return 'Nosso sistema teve um problema.\n Mas não se preocupe, pode mandar uma mensagem para esse número de Whatsapp +55 (11) 3334-0920 e nossa equipe vai te ajudar com seu cadastro!'
}

module.exports = validateCnpj