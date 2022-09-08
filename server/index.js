import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/api.js';
import cors from 'cors';

const server = express();
server.use(express.json());

server.use(cors());

const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(router);

server.use(express.static(path.resolve(__dirname, '../client/build')));

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})