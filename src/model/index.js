require('dotenv').config()
const axios = require('axios')
const config = require('./axiosConfig')

const model = async () => {
	try {
		const { data } = await axios(config)
		console.log(data)
	} catch (error) {
		console.log(error)
	} 
}

model()