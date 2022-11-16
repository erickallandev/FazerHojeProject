import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import Usuario from '../models/usuario.js'

dotenv.config();

const notAuthorizedJson = { 
    status: 401, message: "Não autorizado."
}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use(new JWTStrategy(options, async (payload, done) => {
    const usuario = await Usuario.findByPk(payload.id);
    if(usuario) {
        return done(null, user);
    } else {
        return done (notAuthorizedJson, false)
    }
}));


export default passport;