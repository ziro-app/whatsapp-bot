require('dotenv').config()
const axios = require('axios')
const config = require('./axiosConfig')
const arrayObject = require('@ziro/array-object')
const dataTransformations = require('./dataTransformations')
const priceNumberToText = require('./priceNumberToText')
const findSuppliers = require('./findSuppliers')
const pickThreeRandomSuppliers = require('./pickThreeRandomSuppliers')

const model = async (products, prices, style) => {
	try {
		const { data: { valueRanges } } = await axios(config)
		const [baseArray, productsArray, priceTableArray] = valueRanges
		const [base, priceTable] = dataTransformations(
			arrayObject(baseArray),
			arrayObject(productsArray),
			arrayObject(priceTableArray)
		)
		const priceRanges = products.map((product, index) =>
			priceNumberToText(priceTable, product, prices[index])
		)
		return products.map((product, index) => {
			const suppliers = findSuppliers(base, product, priceRanges[index], style)
			const onlyNameAndInsta = suppliers.map(supplier => ({
				nome: supplier.nome,
				insta: supplier.insta
			}))
			return pickThreeRandomSuppliers(onlyNameAndInsta)
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = model
// model(['calca','cinto','short'],[50,60,70],'casual').then(result => console.log(result))