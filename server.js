const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 8080; // <-- MUDANÇA AQUI

// Configurações do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); // Para conseguir ler o corpo de requisições POST
app.use(express.static('public')); // Para servir arquivos como logo.png, CSS, etc.

// Usar as rotas da API
app.use('/api', apiRoutes);

// Rota principal que renderiza seu painel financeiro
app.get('/financeiro', (req, res) => {
    res.render('financeiro');
});

// Sincroniza o banco de dados e inicia o servidor
// (Essa parte foi adicionada no passo a passo completo, vou mantê-la aqui)
const sequelize = require('./config/database'); 
sequelize.sync().then(() => { 
    app.listen(PORT, () => {
        // O console.log agora mostrará a nova porta
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
});