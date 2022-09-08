import express from 'express';

const server = express();

const PORT = process.env.PORT || 3001;

server.get('/api', (req, res) => {
    res.json({message: "Tudo está funcionando bem!"});
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})