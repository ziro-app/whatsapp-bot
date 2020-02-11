require('dotenv').config()

const middy = require('@middy/core')
const { preflight } = require('@ziro/middleware')
const httpUrlEncodeBodyParser = require("@middy/http-urlencode-body-parser")
const { errorHandler } = require('@ziro/middleware')
const { cors } = require('@ziro/middleware')

const main = handler =>
	middy(handler)
	.use(preflight)
	.use(httpUrlEncodeBodyParser())
	.use(errorHandler)
	.use(cors)

module.exports = main