const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transacao = sequelize.define('Transacao', {
    descricao: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    categoria: { type: DataTypes.STRING },
    data: { type: DataTypes.DATEONLY, allowNull: false },
    tipo: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Despesa' }
});

module.exports = Transacao;