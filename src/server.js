const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const authRoute = require('./routes/auth.route')
const homeRoute = require('./routes/home.route')
const logoutRoute = require('./routes/logout.route')
const userRoute = require('./routes/user.route')
const categoriasRoute = require('./routes/categorias.route')
const productosRoute = require('./routes/productos.route')
const clientesRoute = require('./routes/clientes.route')
const ventasRoute = require('./routes/ventas.route')

require('./asociaciones')

const passportMiddleware = require('./middlewares/passport')

const app = express()

/*
	Configuraciones 
*/

app.set('port', process.env.PORT)

/*
	Middlewares
*/
app.use(cors())
app.use(morgan('dev'))
// para que podamos entender el formato json
app.use(express.json())
app.use(express.raw({ type: 'image/*', limit: '4mb' }))
// Servir archivos estáticos que están en la carpeta public/
app.use(express.static('public'))
// Servir las imagenes que vienen de seedear la data
// app.use('/imagenes', express.static('public/imagenes_seed'));
app.use(cookieParser())
app.use(helmet())
// Trabajar con datos en json
app.use(express.urlencoded({ extended: false }))

app.use(passport.initialize())
passport.use(passportMiddleware)

/*
	Rutas
*/

app.use('/api', authRoute)
app.use('/api', homeRoute)
app.use('/api', userRoute)
app.use('/api', logoutRoute)
app.use('/api', productosRoute)
app.use('/api', categoriasRoute)
app.use('/api', ventasRoute)
app.use('/api', clientesRoute)

module.exports = app
