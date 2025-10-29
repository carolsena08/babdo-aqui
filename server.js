const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api'); // <-- Vai carregar nossas rotas

const app = express();
const PORT = process.env.PORT || 8080; // <-- Porta 8080

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

// Inicia o servidor (sem banco de dados)
app.listen(PORT, () => {
    console.log(`>>> Servidor rodando na porta ${PORT}. Conectado SOMENTE ao Asaas.`);
});