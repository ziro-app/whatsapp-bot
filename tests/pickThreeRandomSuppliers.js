const test = require('ava')
const pickThreeRandomSuppliers = require('../src/model/pickThreeRandomSuppliers')

const testTable = [
  { produto: 'bijuteria', min: 9, baixo: 19, alto: 40 },
  { produto: 'blazer', min: 50, baixo: 89, alto: 160 },
  { produto: 'blusa', min: 30, baixo: 49, alto: 90 },
  { produto: 'body', min: 40, baixo: 79, alto: 100 },
  { produto: 'bolsa', min: 30, baixo: 79, alto: 150 },
  { produto: 'calca', min: 40, baixo: 89, alto: 130 },
  { produto: 'camisa', min: 40, baixo: 79, alto: 120 },
  { produto: 'cardigan', min: 40, baixo: 89, alto: 110 },
  { produto: 'kimono', min: 40, baixo: 89, alto: 110 },
  { produto: 'casaco', min: 50, baixo: 89, alto: 140 },
  { produto: 'cinto', min: 20, baixo: 49, alto: 90 },
  { produto: 'conjunto', min: 70, baixo: 109, alto: 160 },
  { produto: 'cropped', min: 40, baixo: 59, alto: 90 },
  { produto: 'jaqueta', min: 50, baixo: 89, alto: 150 },
  { produto: 'macacao', min: 60, baixo: 89, alto: 140 },
  { produto: 'macaquinho', min: 50, baixo: 79, alto: 130 },
  { produto: 'short', min: 40, baixo: 79, alto: 110 },
  { produto: 'saia', min: 40, baixo: 79, alto: 110 },
  { produto: 'tshirt', min: 30, baixo: 59, alto: 90 },
  { produto: 'vestido curto', min: 40, baixo: 89, alto: 150 },
  { produto: 'vestido longo', min: 60, baixo: 129, alto: 190 }
]

test(`Test when table is empty`, t => {
  const result = pickThreeRandomSuppliers([]).length
  const expected = 0
  t.is(result, expected)
})

for (let i = 0; i < 10000; i++) {
	test(`Test length - ${i}`, t => {
		const result = pickThreeRandomSuppliers(testTable).length
		const expected = 3
		t.is(result, expected)
	})
}