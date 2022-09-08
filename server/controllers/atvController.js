import { Atividade } from '../models/atividade.js';

export const listarAtividades = async (req, res) => {
    let atividades = await Atividade.findAll();
    res.json({atividades});
}


export const novaAtividade = async (req, res) => {
    if(req.body.atividade) {
        const novaAtividade = await Atividade.create({
            atividade: req.body.atividade
        });
        res.status(201).json(novaAtividade);
    } else {
        res.json({error: 'Houve um erro ao tentar adicionar a nova atividade. Tente novamente!'});
    }
}

export const editarAtividade = async (req, res) => {
    let id = req.params.id;
    let item = await Atividade.findByPk(id);

    if(item) {
        if(req.body.atividade) {
            item.atividade = req.body.atividade
        }
        if(req.body.estado) {
            switch(req.body.estado.toLowerCase()) {
                case 'true':
                case '1':
                    item.estado = true;
                    break;
                case 'false':
                case '0':
                    item.estado = false;
                    break;
            }
        }

        await item.save();
        res.json({item});
    
       } else {
        res.json({error: 'Um erro ocorreu ao atualizar o item!'});
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