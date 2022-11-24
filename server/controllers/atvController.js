import Atividade from '../models/atividade.js';
import Usuario from '../models/usuario.js';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const listarAtividades = async (req, res) => {
    if (!req.usuario) {
        res.json({ error: 'Não logado!' });
    } else {
    let usuario_ID = req.usuario.id;
    let atividades = await Atividade.findAll({where: { userID: usuario_ID }});
    res.json({ atividades });
    }
}


export const novaAtividade = async (req, res) => {
    if (!req.usuario) {
        res.json({ error: 'Não logado!' });
    } else {
        if (req.body.atividade) {
            const novaAtividade = await Atividade.create({
                atividade: req.body.atividade,
                userID: req.usuario.id
            });
            res.status(201).json(novaAtividade);
        } else {
            res.json({ error: 'Houve um erro ao tentar adicionar a nova atividade. Tente novamente!' });
        }
    }

}


export const editarAtividade = async (req, res) => {
    let id = req.params.id;
    let item = await Atividade.findByPk(id);

    if (item) {
        item.estado = req.body.estado;

        if (req.body.atividade) {
            item.atividade = req.body.atividade
        }

        await item.save();
        res.json({ item });

    } else {
        res.json({ error: 'Um erro ocorreu ao atualizar o item!' });
    }
}

export const listarAtividadeID = async (req, res) => {
    let id = req.params.id;
    let item = await Atividade.findByPk(id);

    res.json(item);
}

export const deletarAtividade = async (req, res) => {
    let id = req.params.id;
    let item = await Atividade.findByPk(id);
    if (item) {
        item.destroy();
    }
    res.json({});
}