import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Usuario from '../models/usuario.js'

dotenv.config();

const notAuthorizedJson = { status: 401, message: 'Não autorizado!' };

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    const usuario = await Usuario.findByPk(jwt_payload.id);
    if (usuario) {
        return done(null, usuario);
    } else {
        return done(notAuthorizedJson, false);
    }
}));

export const privateRoute = (req, res, next) => {
    passport.authenticate('jwt', (err, usuario) => {
        req.usuario = usuario;
        return usuario ? next() : next(notAuthorizedJson);
    })(req, res, next);
}

export default passport;