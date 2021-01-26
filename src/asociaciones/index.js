const User = require('../models/user.model')
const Personal = require('../models/personal.model')

User.hasOne(Personal, { foreignKey: { name: 'id_usu', allowNull: false } })
Personal.belongsTo(User, { foreignKey: { name: 'id_usu' } })
