const express = require('express');
const app = express();
const cors = require ('cors')// Estava com problemas para rodar no postman dando erro de CORS, pesquisei e me foi indicado inserir esse require
const port = 3000; 
// Middleware para usar o CORS
app.use(cors());

// Criação das ids
let items = [
    { id: 1, name: 'A', description: 'Vasco da Gama' },
    { id: 2, name: 'B', description: 'Corinthians' },
    { id: 3, name: 'C', description: 'Joinville' }
];

// Buscando as ids
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id); // Pegar o id da rota e converter para número
    const item = items.find(i => i.id === itemId); // Buscar o item pelo id

    if (item) {
        res.status(200).json(item); // Retorno de sucesso
    } else {
        res.status(404).json({ error: 'Esse time não existe' }); // Retorno de erro
    }
});

// Aqui mostra o servidor rodando na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
