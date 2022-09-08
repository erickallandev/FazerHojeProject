import express, { Router } from 'express';
import bodyParser from 'body-parser';
import * as Controller from '../controllers/atvController.js';

const router = Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/atividades', Controller.listarAtividades);
router.get('/atividades/:id', Controller.listarAtividadeID);
router.post('/atividades', urlencodedParser, Controller.novaAtividade);
router.put('/atividades/:id', urlencodedParser, Controller.editarAtividade);
router.delete('/atividades/:id', Controller.deletarAtividade);

export default router;