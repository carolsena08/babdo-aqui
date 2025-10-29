<<<<<<< HEAD
const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log(`[Debug] Tentando conectar com a URL: ${process.env.DATABASE_URL ? 'URL encontrada!' : 'URL NÃO ENCONTRADA'}`);

const sequelize = new Sequelize(process.env.DATABASE_URL, {

    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('>>> CONEXÃO COM O SUPABASE (POSTGRESQL) ESTABELECIDA COM SUCESSO.');
    } catch (error) {
        console.error(`>>> ERRO: Não foi possível conectar ao Supabase: ${error.name}`);
        console.error(error);
=======

const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as senhas do .env

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        
        // --- PARTE VITAL PARA O SUPABASE ---
        // Exige conexão segura (SSL)
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false 
            }
        }
    }
);

// Testa a conexão
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('>>> Conexão com o Supabase (PostgreSQL) estabelecida com sucesso.');
    } catch (error) {
        console.error('>>> ERRO: Não foi possível conectar ao Supabase:', error);
>>>>>>> f498bbe76ecbcca0cd1542a106ec4e6d544b291a
    }
};

testConnection();

module.exports = sequelize;