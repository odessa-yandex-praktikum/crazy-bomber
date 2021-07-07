import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import Message from './models/message';
import Topic from './models/topic';
import User from './models/user';

const sequelizeOptions: SequelizeOptions = {
    username: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'crazybomber', //database name - should be created before launch

    dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([User, Topic, Message]);

export {sequelize};
