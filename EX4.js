const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); // Middleware para permitir leitura de JSON

// Dados de exemplo
let items = [
    { id: 1, name: 'Item 1', description: 'GOT' },
    { id: 2, name: 'Item 2', description: 'POST' },
    { id: 3, name: 'Item 3', description: 'DESISTO' }
];

// Rota para buscar item por ID (GET)
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);

    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});

// Rota para atualizar parcialmente o campo name de um item (PATCH)
app.patch('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);

    if (item) {
        if (req.body.name) {
            item.name = req.body.name;
            res.status(200).json(item);
        } else {
            res.status(400).json({ error: 'Campo "name" é obrigatório para atualizar' });
        }
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});

// Rota para remover todos os itens (DELETE)
app.delete('/items', (req, res) => {
    items = []; // Esvazia o array de itens
    res.status(200).json({ message: 'Todos os itens foram removidos' }); // Retorna mensagem de sucesso
});

// Porta 3000 
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
