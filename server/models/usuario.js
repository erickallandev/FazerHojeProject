import { DataTypes } from 'sequelize';
import db_sequelize from '../instances/pg.js';

const Usuario = db_sequelize.define('Usuario', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    senha: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

const init = async () => {
    await Usuario.sync();
};

init();

export default Usuario