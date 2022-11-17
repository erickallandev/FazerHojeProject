import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/api.js';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './config/passport.js';

dotenv.config();
const server = express();
server.use(express.json());

server.use(cors());

const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(passport.initialize());

server.use(router);

server.use(express.static(path.resolve(__dirname, '../client/build')));

const errorHandler = (err, req, res, next) => {
    if(err.status) {
        res.status(err.status);
    } else {
        res.status(400);
    }
    if(err.message) {
        res.json({ error: err.message })
    } else {
        res.json({error: 'Ocorreu algum erro!'})
    }
}
server.use(errorHandler);

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})