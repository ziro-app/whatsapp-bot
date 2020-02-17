const priceNumberToText = (table, product, price) => {
	const priceRange = table.find(item => item.produto === product)
	if (priceRange) {
		if (Math.floor(price/2) <= priceRange.min) return 'Mínimo'
		if (Math.floor(price/2) <= priceRange.baixo) return 'Baixo'
		if (Math.floor(price/2) < priceRange.alto) return 'Médio'
		return 'Alto'		
	}
	return ''
}

module.exports = priceNumberToText