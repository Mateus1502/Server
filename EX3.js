const express = require('express');
const app = express();
const cors = require ('cors')// Estava com problemas para rodar no postman dando erro de CORS, pesquisei e me foi indicado inserir esse require
const port = 3000;
// Middleware para usar o CORS
app.use(cors());

app.use(express.json()); // Permite JSON na requisição

// Dados de exemplo
let items = [
    { id: 1, name: 'Item 1', description: 'Arroz' },
    { id: 2, name: 'Item 2', description: 'Feijão' },
    { id: 3, name: 'Item 3', description: 'Batata' }
];

// Rota para buscar item por ID (GET)
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);

    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ error: 'Achei não' });
    }
});

// Atualizando parcialmente o nome de um item (PATCH)
app.patch('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);

    if (item) {
        // Permite que atualize somente o campo nome se for requerido no corpo da requisição
        if (req.body.name) {
            item.name = req.body.name;
            res.status(200).json(item); // Retorna o item atualizado
        } else {
            res.status(400).json({ error: 'É necessário o campo name para atualizar' });
        }
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});



// Servidor porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
