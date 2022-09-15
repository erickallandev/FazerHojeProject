import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db_sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

db_sequelize
    .authenticate()
    .then( () => console.log("Conexão estabelecida com sucesso!"))
    .catch((err) => console.error("Erro na conexão!", err));

    export default db_sequelize