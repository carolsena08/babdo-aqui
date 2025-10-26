const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Aluno', {
    nomeCompleto: { type: DataTypes.STRING, allowNull: false },
    nomeResponsavel: { type: DataTypes.STRING, allowNull: false },

    // --- AQUI ESTÁ A "PONTE" ---
    // Esta coluna vai guardar o ID do cliente lá no Asaas
    asaasCustomerId: { type: DataTypes.STRING, allowNull: true }
});

module.exports = Aluno;