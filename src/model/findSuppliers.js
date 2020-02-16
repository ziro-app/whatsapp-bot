// based on product, price and style, find all matching suppliers in database
const findSuppliers = (base, product, price, style) => {
	if (price === 'Mínimo') return []
	const result = base.filter(({ produtos, preco, estilos }) =>
		produtos.includes(product) && preco === price && estilos.includes(style))
	if (result.length === 0) return []
	return result
}

module.exports = findSuppliers