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
    }
};

testConnection();

module.exports = sequelize;