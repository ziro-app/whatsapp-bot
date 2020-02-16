const pickThreeRandomSuppliers = suppliers => {
	if (suppliers.length <= 3) return suppliers
	const { floor, random } = Math
	const maxIndex = suppliers.length - 1
	const randomIndexOne = floor(random() * (maxIndex) + 1)
	const randomIndexTwo = floor(random() * (maxIndex) + 1)
	const randomIndexThree = floor(random() * (maxIndex) + 1)
	if (
		randomIndexOne !== randomIndexTwo &&
		randomIndexOne !== randomIndexThree &&
		randomIndexTwo !== randomIndexThree
	) return [
		suppliers[randomIndexOne],
		suppliers[randomIndexTwo],
		suppliers[randomIndexThree]
	] 
	else return pickThreeRandomSuppliers(suppliers)
}

module.exports = pickThreeRandomSuppliers