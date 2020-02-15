// based on product, price and style, find all matching suppliers in database
const findSuppliers = (product, price, style, base) => base.filter(fabricante =>
	fabricante.produtos.includes(product) && fabricante.preco === price && fabricante.estilos.includes(style))

module.exports = findSuppliers