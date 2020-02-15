const priceNumberToText = (table, product, price) => {
	console.log(table)
	const priceRange = table.find(item => item.produto === product)
	if (price <= priceRange.min) return 'Mínimo'
	if (price <= priceRange.baixo) return 'Baixo'
	if (price <= priceRange.alto) return 'Médio'
	return 'Alto'
}

module.exports = priceNumberToText