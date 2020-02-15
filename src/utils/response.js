const responseOk = body => ({
	headers: { 'Content-Type': 'application/json' },
	statusCode: 200,
	body: JSON.stringify(body, null, 4)
})

module.exports = responseOk