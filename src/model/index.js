require('dotenv').config()
const axios = require('axios')
const config = require('./axiosConfig')
const arrayObject = require('@ziro/array-object')
const dataTransformations = require('./dataTransformations')
const priceNumberToText = require('./priceNumberToText')
const findSuppliers = require('./findSuppliers')

const model = async () => {
	try {
		const { data: { valueRanges } } = await axios(config)
		const [baseArray, productsArray, priceTableArray] = valueRanges
		const base = dataTransformations(
			arrayObject(baseArray),
			arrayObject(productsArray),
		)
		const priceRange = priceNumberToText(arrayObject(priceTableArray), 'cinto', 30)
		console.log(priceRange)
		// const targetSuppliers = findSuppliers('calca', 'Médio', 'Casual', base)
		// console.log(targetSuppliers)
		// const targetNamesAndInstas = targetSuppliers.map(supplier => ({
		// 	nome: supplier.nome,
		// 	insta: supplier.insta
		// }))
		// console.log(targetNamesAndInstas)
		// console.log(fullBase.length)
		// console.log(transformedBase.length)
		// console.log(transformedProducts.length)
	} catch (error) {
		console.log(error)
	} 
}

model()