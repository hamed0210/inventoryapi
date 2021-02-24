const User = require('../models/user.model')
const Personal = require('../models/personal.model')
const Productos = require('../models/productos.model')
const Categorias = require('../models/categorias.model')

User.hasOne(Personal, { foreignKey: { name: 'id_usu', allowNull: false } })
Personal.belongsTo(User, { foreignKey: { name: 'id_usu' } })

Categorias.hasOne(Productos, {
	foreignKey: { name: 'codigo', allowNull: false },
})
Productos.belongsTo(Categorias, { foreignKey: { name: 'categoria' } })
