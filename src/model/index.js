require('dotenv').config()
const axios = require('axios')
const config = require('./axiosConfig')
const arrayObject = require('@ziro/array-object')
const dataTransformations = require('./dataTransformations')
const priceNumberToText = require('./priceNumberToText')
const findSuppliers = require('./findSuppliers')

const model = async (product, price, style) => {
	try {
		const { data: { valueRanges } } = await axios(config)
		const [baseArray, productsArray, priceTableArray] = valueRanges
		const [base, priceTable] = dataTransformations(
			arrayObject(baseArray),
			arrayObject(productsArray),
			arrayObject(priceTableArray)
		)
		const priceRange = priceNumberToText(priceTable, product, price)
		const targetSuppliers = findSuppliers(base, product, priceRange, style)
		return targetSuppliers.map(supplier => ({
			nome: supplier.nome,
			insta: supplier.insta
		}))
	} catch (error) {
		console.log(error)
	} 
}
const [product, price, style] = process.argv.slice(2)
model(product, price, style).then(result => console.log(result))