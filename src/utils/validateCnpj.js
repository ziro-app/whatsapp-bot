const validateCnpj = (status, cnpjData) => {
	if (status) {
		const cnaes = [...cnpjData.atividades_secundarias, cnpjData.atividade_principal].map(({ code }) => code)
		const cnaeIsValid = !!cnaes.filter(code => code === '47.81-4-00').pop()
		if (!cnaeIsValid) throw { msg: 'CNPJ não tem CNAE 4781-4/00', customError: true }
		const isActive = cnpjData.situacao === 'ATIVA'
		if (!isActive) throw { msg: 'CNPJ não está ativo', customError: true }
		return 'Cnpj está Ok!'
	}
}

module.exports = validateCnpj