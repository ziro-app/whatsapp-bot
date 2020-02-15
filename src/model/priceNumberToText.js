const priceNumberToText = (table, product, price) => {
	const priceRange = table.find(item => item.produto === product)
	if (priceRange) {
		if (price <= priceRange.min) return 'Mínimo'
		if (price <= priceRange.baixo) return 'Baixo'
		if (price < priceRange.alto) return 'Médio'
		return 'Alto'		
	}
	return ''
}

module.exports = priceNumberToText