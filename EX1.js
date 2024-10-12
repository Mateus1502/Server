const express = require('express');
const fs = require('fs'); // Módulo do Node.js para trabalhar com arquivos
const app = express();
const port = 3000;

// Middleware para tratar dados JSON
app.use(express.json());

// Rota POST para receber os dados do item e salvar no arquivo .json
app.post('/items', (req, res) => {
    const { name } = req.body;

    // Validação do campo 'name'
    if (!name || typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({ message: "O campo 'name' é obrigatório e deve ter pelo menos 3 caracteres." });
    }

    // Carregar os dados existentes do arquivo JSON (se existir)
    fs.readFile('items.json', 'utf8', (err, data) => {
        let items = [];
        if (!err) {
            items = JSON.parse(data);  //Realiza a conversão JSON para objeto
        }

        // Criar um item novo
        const newItem = { id: Date.now(), name };

        // Adiciona o novo item na lista
        items.push(newItem);

        // Salvar a lista atualizada no arquivo 'items.json'
        fs.writeFile('items.json', JSON.stringify(items, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao salvar o item no arquivo.' });
            }
            console.log('Item salvo com sucesso:', newItem);
            return res.status(201).json(newItem);
        });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
