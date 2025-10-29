const express = require('express');
const router = express.Router();
const asaasService = require('../services/asaasService'); // <-- Nosso "telefone"

// Rota para buscar a situação dos alunos
router.get('/alunos', async (req, res) => {
    const clientesAsaas = await asaasService.getClientes();
    
    // Formata os dados para o formato que o frontend espera
    const alunosFormatados = clientesAsaas.map(cliente => {
        return {
            id: cliente.id, // <-- IMPORTANTE: Este é o ID do Asaas
            studentName: cliente.name,
            parentName: cliente.name, // Asaas não tem campo "responsável"
            mensalidade: 550.00, // Valor de exemplo, pois não vem do cliente
            vencimento: 'N/A', // Não temos essa info no cliente
            status: 'pago' // Status de exemplo
        };
    });
    res.json(alunosFormatados);
});

// Rota para buscar o relatório de transações (SOMENTE RECEITAS DO ASAAS)
router.get('/transacoes', async (req, res) => {
    const cobrancasAsaas = await asaasService.getCobrancas();

    // Transforma os dados do Asaas para o formato que seu frontend espera
    const transacoesFormatadas = cobrancasAsaas.map(cobranca => ({
        id: cobranca.id,
        date: cobranca.dueDate,
        description: cobranca.description,
        category: 'Mensalidade', // Categoria de exemplo
        value: cobranca.value,
        type: 'Receita', // Todas as cobranças do Asaas são receitas
        status: cobranca.status === 'PAID' ? 'ativo' : 'pendente'
    }));

    res.json(transacoesFormatadas);
});

// Rota para criar um novo lançamento (SOMENTE RECEITAS)
router.post('/transacoes', async (req, res) => {
    // Pega os dados que o frontend enviou
    const { tipo, customerId, value, date, description } = req.body;

    // Se for "Despesa", não fazemos nada (ainda)
    if (tipo === 'Despesa') {
        return res.status(400).json({ message: "Despesas não podem ser salvas sem um banco de dados." });
    }

    // Se for "Receita", cria a cobrança no Asaas
    try {
        const novaCobranca = await asaasService.criarCobranca({
            customer: customerId, // Este é o ID do cliente Asaas
            billingType: 'BOLETO', // ou PIX, CREDIT_CARD
            dueDate: date,
            value: value,
            description: description
        });
        res.status(201).json(novaCobranca);
    } catch (error) {
        res.status(400).json({ message: "Falha ao criar cobrança no Asaas." });
    }
});


module.exports = router;