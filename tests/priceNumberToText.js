const test = require('ava')
const priceNumberToText = require('../src/model/priceNumberToText')

const testTable = [
  { produto: 'bijuteria', min: 9, baixo: 19, alto: 40 },
  { produto: 'blazer', min: 50, baixo: 89, alto: 160 },
  { produto: 'blusa', min: 30, baixo: 49, alto: 90 },
  { produto: 'body', min: 40, baixo: 79, alto: 100 },
  { produto: 'bolsa', min: 30, baixo: 79, alto: 150 },
  { produto: 'calca', min: 40, baixo: 89, alto: 130 },
  { produto: 'camisa', min: 40, baixo: 79, alto: 120 },
  { produto: 'cardigankimono', min: 40, baixo: 89, alto: 110 },
  { produto: 'casaco', min: 50, baixo: 89, alto: 140 },
  { produto: 'cinto', min: 20, baixo: 49, alto: 90 },
  { produto: 'conjunto', min: 70, baixo: 109, alto: 160 },
  { produto: 'cropped', min: 40, baixo: 59, alto: 90 },
  { produto: 'jaqueta', min: 50, baixo: 89, alto: 150 },
  { produto: 'macacao', min: 60, baixo: 89, alto: 140 },
  { produto: 'macaquinho', min: 50, baixo: 79, alto: 130 },
  { produto: 'shortsaia', min: 40, baixo: 79, alto: 110 },
  { produto: 'tshirt', min: 30, baixo: 59, alto: 90 },
  { produto: 'vestidocurto', min: 40, baixo: 89, alto: 150 },
  { produto: 'vestidolongo', min: 60, baixo: 129, alto: 190 }
]

test('Test invalid product', t => {
	const result = priceNumberToText(testTable, 'xxxx', 50)
	const expected = ''
	t.is(result, expected)
})
test('Test return values 1', t => {
	const result = priceNumberToText(testTable, 'blazer', 50)
	const expected = 'Mínimo'
	t.is(result, expected)
})
test('Test return values 2', t => {
	const result = priceNumberToText(testTable, 'blazer', 51)
	const expected = 'Baixo'
	t.is(result, expected)
})
test('Test return values 3', t => {
	const result = priceNumberToText(testTable, 'blazer', 89)
	const expected = 'Baixo'
	t.is(result, expected)
})
test('Test return values 4', t => {
	const result = priceNumberToText(testTable, 'blazer', 90)
	const expected = 'Médio'
	t.is(result, expected)
})
test('Test return values 5', t => {
	const result = priceNumberToText(testTable, 'blazer', 159)
	const expected = 'Médio'
	t.is(result, expected)
})
test('Test return values 6', t => {
	const result = priceNumberToText(testTable, 'blazer', 160)
	const expected = 'Alto'
	t.is(result, expected)
})