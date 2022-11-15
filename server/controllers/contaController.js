import Usuario from '../models/usuario.js';

export const novaConta = async (req, res) => {
    if (req.body.email && req.body.senha) {
        let { email, senha } = req.body;
        let hasUser = await Usuario.findOne({ where: { email } })
        if (!hasUser) {
            let novoUsuario = await Usuario.create({ email, senha })

            res.status(201);
            res.json({ id: novoUsuario.id })
        } else {
            res.json({ error: 'Email já existe.' })
        }
    }

    res.json({ error: 'Email e/ou senha não enviados.'})
}

export const login = async (req, res) => {
    if(req.body.email && req.body.senha) {
        let email = req.body.email;
        let senha = req.body.senha;

        let usuario = await Usuario.findOne({
            where: { email, senha }
        });

        if(usuario) {
            res.json({ status: true });
            return
        }
    }

    res.json({status: false})
}