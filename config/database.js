const { Sequelize } = require('sequelize');
require('dotenv').config();

// --- LINHA DE DEBUG ---
console.log(`[Debug] Tentando conectar com a URL: ${process.env.DATABASE_URL ? 'URL encontrada!' : 'URL NÃO ENCONTRADA'}`);
// ----------------------

// --- O Método Correto (Usando a URL) ---
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    
    // --- OBRIGATÓRIO PARA O SUPABASE ---
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    },
    // --- FIM DO SSL ---

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
// --- FIM DO MÉTODO ---

// Testa a conexão
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('>>> CONEXÃO COM O SUPABASE (POSTGRESQL) ESTABELECIDA COM SUCESSO.');
    } catch (error) {
        console.error(`>>> ERRO: Não foi possível conectar ao Supabase: ${error.name}`);
        // console.error(error); // Descomente esta linha se precisar ver o erro completo
    }
};

testConnection();

module.exports = sequelize;