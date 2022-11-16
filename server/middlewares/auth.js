import Usuario from '../models/usuario.js'
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
    private: async (req, res, next) => {
        // Fazer verificação de auth
        let sucess = false;
        
        if(req.headers.authorization) {

            // Bearer token...
            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer') {
                try {
                    JWT.verify(token, process.env.JWT_SECRET_KEY);

                    sucess = true;
                } catch (error) {

                }
            }
        }

        if(sucess) {
            next()
        } else {
            res.status(403); // Não permitido
            res.json({error: 'Não autorizado!'})
        }
    }
}