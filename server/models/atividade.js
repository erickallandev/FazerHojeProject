import { DataTypes } from 'sequelize';
import { db_sequelize } from '../instances/pg.js';

export const Atividade = db_sequelize.define('Atividade', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    atividade: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'todos',
    timestamps: false
});