require('dotenv').config()
const axios = require('axios')
const config = require('./axiosConfig')
const arrayObject = require('@ziro/array-object')

const model = async () => {
	try {
		const { data: { valueRanges } } = await axios(config)
		const [baseArray, productsArray, priceTableArray] = valueRanges
		const base = arrayObject(baseArray)
		const products = arrayObject(productsArray)
		const priceTable = arrayObject(priceTableArray)
		const transformedBase = base.map(supplier => {
			const { Fabricante, Instagram, Preco, Bot, ...styles } = supplier 
			return {
				nome: Fabricante,
				insta: Instagram,
				estilos: Object.values(styles),
				preco: Preco
			}
		})
		// console.log(transformedBase)
		const transformedProducts = products.map(product => {
			const { fabricante, tipo, ...productList } = product
			const productEntries = Object.entries(productList)
			const productArrayList = productEntries.map(entry => {
				const [productName, availability] = entry
				if (availability === 's')
					return productName
				return null
			}).filter(productName => !!productName)
			return {
				nome: fabricante,
				produtos: productArrayList
			}
		})
		console.log(transformedProducts)
		const fullBase = transformedBase.map(supplier => {
			const match = transformedProducts.find(product => product.nome === supplier.nome)
			console.log(match)
			const { nome, produtos } = match
			return { ...supplier, produtos }
		})
		console.log(fullBase)
		console.log(transformedBase.length)
		console.log(transformedProducts.length)
	} catch (error) {
		console.log(error)
	} 
}

model()