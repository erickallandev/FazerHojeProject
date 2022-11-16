import Usuario from '../models/usuario.js';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const novaConta = async (req, res) => {
    if (req.body.email && req.body.senha) {
        let { email, senha } = req.body;
        let hasUser = await Usuario.findOne({ where: { email } });
        if (!hasUser) {
            let novoUsuario = await Usuario.create({ email, senha })

            const token = JWT.sign(
                { id: novoUsuario.id, email: novoUsuario.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '2h' }
            );

            res.status(201);
            res.json({ id: novoUsuario.id, token })
        } else {
            res.json({ error: 'Email já existe.' })
        }
    } else {
        res.json({ error: 'Email e/ou senha não enviados.' })
    }
}

export const login = async (req, res) => {
    if (req.body.email && req.body.senha) {
        let email = req.body.email;
        let senha = req.body.senha;

        let usuario = await Usuario.findOne({
            where: { email, senha }
        });

        if (usuario) {
            const token = JWT.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '2h' }
            );

            res.json({ status: true, token });
            return;
        }
    }
    res.json({ status: false })
}

export const listarUsuarios = async (req, res) => {
    let usuarios = await Usuario.findAll();
    let lista = [];

    for (let i in usuarios) {
        lista.push(usuarios[i].email);
    }
    if (lista) {
        res.json({ lista });
    } else {
        res.send(error, 'Não há usuários cadastrados.')
    }
}