import { Router } from 'express';
import bodyParser from 'body-parser';
import * as atvController from '../controllers/atvController.js';
import * as contaController from '../controllers/contaController.js'
import { privateRoute } from '../config/passport.js'

const router = Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/atividades', privateRoute, atvController.listarAtividades);
router.get('/atividades/:id', privateRoute, atvController.listarAtividadeID);
router.post('/atividades', privateRoute, urlencodedParser, atvController.novaAtividade);
router.put('/atividades/:id', privateRoute, urlencodedParser, atvController.editarAtividade);
router.delete('/atividades/:id', privateRoute, atvController.deletarAtividade);

router.post('/novaconta', urlencodedParser, contaController.novaConta);
router.post('/login', urlencodedParser, contaController.login);

router.get('/usuarios', privateRoute, contaController.listarUsuarios);


export default router;