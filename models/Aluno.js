const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Aluno', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeCrianca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nomeResponsavel: {
        type: DataTypes.STRING,
        allowNull: false
    },
<<<<<<< HEAD
=======
    // ... outros dados da matrícula (CPF, email, etc.)

>>>>>>> f498bbe76ecbcca0cd1542a106ec4e6d544b291a
    // --- A "PONTE" ---
    // Aqui vamos guardar o ID que o Asaas criou (ex: cus_12345)
    asaasCustomerId: {
        type: DataTypes.STRING,
        allowNull: true // Fica nulo até a sincronização
    }
});

module.exports = Aluno;