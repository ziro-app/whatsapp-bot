const prepareData = (productAnswers, priceAnswers, styleAnswer) => {
	const { productOne, productTwo, productThree } = productAnswers
	const products = [productOne.answer, productTwo.answer, productThree.answer]
	const { priceOne, priceTwo, priceThree } = priceAnswers
	const prices = [priceOne.answer, priceTwo.answer, priceThree.answer]
	const style = styleAnswer.style.answer
	return [products, prices, style]
}

module.exports = prepareData