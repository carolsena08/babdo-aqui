const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const sequelize = require('./config/database'); // <-- 1. IMPORTA O CONECTOR

const app = express();
const PORT = process.env.PORT || 8080; // Porta 8080

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); 
app.use(express.static('public')); 

// Usar as rotas da API
app.use('/api', apiRoutes);

// Rota principal que renderiza seu painel financeiro
app.get('/financeiro', (req, res) => {
    res.render('financeiro');
});

// --- 2. MUDANÇA IMPORTANTE ---
// O servidor só vai "ligar" DEPOIS que a conexão com o Supabase for um sucesso.
// sequelize.sync() também cria as tabelas "Aluno" e "Transacao" se elas não existirem.
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`>>> Servidor rodando na porta ${PORT}. Conectado ao Supabase e Asaas.`);
    });
}).catch(err => {
    console.error('>>> ERRO: Falha ao sincronizar com o banco de dados:', err);
});