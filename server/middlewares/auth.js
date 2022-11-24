import Usuario from '../models/usuario.js'
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyJWT = (req, res, next) => {
    const token = req.headers["Authorization"]

    if(!token) {
        res.send({sucess: false, message: "Erro. O token não foi reconhecido.aaa"});
    } else {
        let decoded = JWT.verify(token, process.env.JWT_SECRET_KEY)
        res.send({sucess: true, decoded})
    }
}