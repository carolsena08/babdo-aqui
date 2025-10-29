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
<<<<<<< HEAD
    }
=======
    },
    // Não precisamos de "tipo", pois esta tabela será SÓ para Despesas
    // As Receitas vivem no Asaas
>>>>>>> f498bbe76ecbcca0cd1542a106ec4e6d544b291a
});

module.exports = Transacao;