require('dotenv').config()

const app = require('./src/server')

app.listen(app.get('port'), () => {
	console.log(`🚀 app running at http://localhost:${app.get('port')}`)
})
