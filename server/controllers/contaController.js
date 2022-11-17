import Usuario from '../models/usuario.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { compareSync, hashSync } from 'bcrypt';

dotenv.config();

export const novaConta = async (req, res) => {
    
    let hasUser = await Usuario.findOne({ where: { email: req.body.email } });
    
    if (hasUser) {
        res.send({
            sucess: false,
            message: 'Usuário já existe.',
        })
    } else {
        const usuario = new Usuario({
            email: req.body.email,
            senha: hashSync(req.body.senha, 10)
        })
    
        usuario.save().then(usuario => {
            res.send({
                sucess: true,
                message: 'Usuário criado com sucesso!',
                usuario: {
                    id: usuario.id,
                    email: usuario.email
                }
            })
        }).catch(err => {
            res.send({
                sucess: false,
                message: 'Erro. Tente novamente.',
                error: err
            })
        })}}

        

export const login = async (req, res) => {
    await Usuario.findOne({ where: { email: req.body.email } }).then(usuario => {
        if(!usuario) {
            return res.status(401).send({
                sucess: false,
                message: 'Usuário não encontrado!'
            })
        }

        if(!compareSync(req.body.senha, usuario.senha)) {
            return res.status(401).send({
                sucess: false,
                message: 'Senha incorreta!'
            })
        }

        const payload = {
            email: usuario.email,
            id: usuario.id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})

        return res.status(200).send({
            sucess: true,
            message: 'Logado com sucesso!',
            token: 'Bearer '+token
        })
    })
}

export const listarUsuarios = async (req, res) => {
    let usuarios = await Usuario.findAll();
    let lista = [];

    for (let i in usuarios) {
        lista.push(usuarios[i]);
    }
    if (lista) {
        res.json({ lista });
    } else {
        res.send(error, 'Não há usuários cadastrados.')
    }
}