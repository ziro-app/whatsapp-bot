const prepareData = (productAnswers, priceAnswers, styleAnswer) => {
	const { productOne, productTwo, productThree } = productAnswers
	const products = [
		productOne.answer.toLowerCase(),
		productTwo.answer.toLowerCase(),
		productThree.answer.toLowerCase()
	]
	const { priceOne, priceTwo, priceThree } = priceAnswers
	const prices = [
		priceOne.answer.toLowerCase(),
		priceTwo.answer.toLowerCase(),
		priceThree.answer.toLowerCase()
	]
	const style = styleAnswer.style.answer.toLowerCase()
	return [products, prices, style]
}

module.exports = prepareData