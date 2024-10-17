const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Permite a leitura do JSON

// Dados
let items = [
    { id: 1, name: 'Item 1', description: 'Kendrick Lamar' },
    { id: 2, name: 'Item 2', description: 'Travis Scott' },
    { id: 3, name: 'Item 3', description: 'Kanye West' }
];

// Fazer a pesquisa dos itens (GET)
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
            res.status(200).json(item); // Sucesso
        } else {
            res.status(400).json({ error: 'Campo "name" é obrigatório para atualizar' }); // Erro
        }
    } else {
        res.status(404).json({ error: 'Item não encontrado' }); // Erro 404
    }
});

// Deletar os itens (DELETE)
app.delete('/items', (req, res) => {
    items = []; // Esvazia o array de itens
    res.status(200).json({ message: 'Todos os itens foram removidos' });
});

// Rota para contar o número de itens existentes (GET)
app.get('/items/count', (req, res) => {
    const count = items.length; // Comando para verificar quantos itens temos no array
    res.status(200).json({ count }); // Mostra quantos itens tem no array
});

// Poeta 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
