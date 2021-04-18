const Productos = require('../models/productos.model')
const Categorias = require('../models/categorias.model')
const Inventario = require('../models/inventario.model')
const Compras = require('../models/compras.model')
const Ventas = require('../models/ventas.model')

Categorias.hasOne(Productos, {
	foreignKey: { name: 'codigo', allowNull: false },
})
Productos.belongsTo(Categorias, { foreignKey: { name: 'categoria' } })

Inventario.belongsTo(Compras, {
	foreignKey: 'codigo_compra',
})
Inventario.belongsTo(Ventas, {
	foreignKey: 'codigo_venta',
})
Compras.hasOne(Inventario, { foreignKey: 'codigo_compra' })
Ventas.hasOne(Inventario, { foreignKey: 'codigo_venta' })
