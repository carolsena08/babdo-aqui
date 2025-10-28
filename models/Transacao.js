const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transacao = sequelize.define('Transacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    // Não precisamos de "tipo", pois esta tabela será SÓ para Despesas
    // As Receitas vivem no Asaas
});

module.exports = Transacao;