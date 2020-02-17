const validateCnpj = (status, cnpjData) => {
	if (status) {
		const cnaes = [...cnpjData.atividades_secundarias, cnpjData.atividade_principal].map(({ code }) => code)
		const cnaeIsValid = !!cnaes.filter(code => code === '47.81-4-00').pop()
		if (!cnaeIsValid) return 'CNPJ não tem CNAE 4781-4/00. Se achar que essa informação está errada, não se preocupe. Pode mandar uma mensagem para esse número de Whatsapp +55 (11) 3334-0920 e nossa equipe vai te ajudar com seu cadastro!'
		const isActive = cnpjData.situacao === 'ATIVA'
		if (!isActive) return 'CNPJ não está ativo. Se achar que essa informação está errada, não se preocupe. Pode mandar uma mensagem para esse número de Whatsapp +55 (11) 3334-0920 e nossa equipe vai te ajudar com seu cadastro!'
		return 'Cnpj está Ok!'
	}
	return 'Nosso sistema teve um problema. Mas não se preocupe, pode mandar uma mensagem para esse número de Whatsapp +55 (11) 3334-0920 e nossa equipe vai te ajudar com seu cadastro!'
}

module.exports = validateCnpj