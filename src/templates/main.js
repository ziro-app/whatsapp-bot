require('dotenv').config()
const middy = require('middy')
const { jsonBodyParser } = require('middy/middlewares')
const { preflight } = require('@ziro/middleware')
const httpUrlEncodeBodyParser = require("@middy/http-urlencode-body-parser")
const { allowedOrigin } = require('@ziro/middleware')
const { auth } = require('@ziro/middleware')
const { errorHandler } = require('@ziro/middleware')
const { cors } = require('@ziro/middleware')
const allowed = 'https://ziro.app'

const main = handler =>
	middy(handler)
	.use(preflight)
	.use(httpUrlEncodeBodyParser())
	.use(errorHandler)
	.use(cors)

module.exports = main