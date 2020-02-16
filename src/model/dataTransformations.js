const splitProducts = require('./splitProducts')

const dataTransformations = (base, products) => {
	const transformedBase = base.map(supplier => {
		const { Fabricante, Instagram, Preco, Bot, ...styles } = supplier 
		return {
			nome: Fabricante,
			insta: Instagram,
			estilos: Object.values(styles),
			preco: Preco
		}
	})
	const transformedProducts = products.map(product => {
		const { fabricante, tipo, ...productList } = product
		const productEntries = Object.entries(productList)
		const productArrayList = productEntries.map(entry => {
			const [productName, availability] = entry
			if (availability === 's')
				return productName
			return null
		}).filter(productName => !!productName)
		const productArrayListSplitted = productArrayList.map(product => splitProducts(product)).flat()
		return {
			nome: fabricante,
			produtos: productArrayListSplitted
		}
	})
	return transformedBase.map(supplier => {
		const match = transformedProducts.find(product => product.nome === supplier.nome)
		const { nome, produtos } = match
		return { ...supplier, produtos }
	})
}

module.exports = dataTransformations