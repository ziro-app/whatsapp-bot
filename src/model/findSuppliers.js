// based on product, price and style, find all matching suppliers in database
const findSuppliers = (base, product, price, style) => {
	if (price === 'Mínimo') return 'Nenhum fornecedor para esta faixa de preço'
	const result = base.filter(({ produtos, preco, estilos }) =>
		produtos.includes(product) && preco === price && estilos.includes(style))
	if (result.length === 0) return 'Nenhum fornecedor encontrado'
	return result
}

module.exports = findSuppliers