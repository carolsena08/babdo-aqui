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
    }
    // A chave extra e o comentário que estavam aqui foram removidos.
});

// O comentário pertence aqui fora:
// Esta tabela é só para Despesas. As Receitas vivem no Asaas.

module.exports = Transacao;