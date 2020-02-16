const splitProducts = string => {
	if (string.includes('/'))
		return string.split('/')
	return string
}

module.exports = splitProducts