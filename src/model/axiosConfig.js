module.exports = ({
	method: 'POST',
	url: process.env.SHEET_URL,
	headers: {
		'Origin': 'https://ziro.app',
		'Content-Type': 'application/json',
		'Authorization': process.env.SHEET_TOKEN
	},
	data: {
	    apiResource: 'values',
	    apiMethod: 'batchGet',
	    spreadsheetId: process.env.SHEET_ID,
	    ranges: ['Base!A:G','Produtos!A:U', `'Faixa Preços'!A:D`]
	}
})