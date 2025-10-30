const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); 
app.use(express.static('public')); 

app.use('/api', apiRoutes);

app.get('/financeiro', (req, res) => {
    res.render('financeiro');
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`>>> Servidor rodando na porta ${PORT}. Conectado ao Supabase e Asaas.`);
    });
}).catch(err => {
    console.error('>>> ERRO: Falha ao sincronizar com o banco de dados:', err);
});