import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const server = express();

const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.resolve(__dirname, '../client/build')));

server.get('/api', (req, res) => {
    res.json({ message: "Tudo está funcionando bem na porta definida!" });
});

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})