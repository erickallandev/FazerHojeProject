import { Router } from 'express';
import bodyParser from 'body-parser';
import * as atvController from '../controllers/atvController.js';
import * as contaController from '../controllers/contaController.js'

const router = Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/atividades', atvController.listarAtividades);
router.get('/atividades/:id', atvController.listarAtividadeID);
router.post('/atividades', urlencodedParser, atvController.novaAtividade);
router.put('/atividades/:id', urlencodedParser, atvController.editarAtividade);
router.delete('/atividades/:id', atvController.deletarAtividade);

router.post('/novaconta', urlencodedParser, contaController.novaConta);
router.post('/login', urlencodedParser, contaController.login);
router.get('/usuarios', contaController.listarUsuarios);


export default router;