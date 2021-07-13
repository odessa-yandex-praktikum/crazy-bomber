import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import Message from './models/message';
import {SiteTheme} from './models/site_theme';
import Topic from './models/topic';
import User from './models/user';
import {UserTheme} from './models/user_theme';

const sequelizeOptions: SequelizeOptions = {
    username: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'crazybomber', //database name - should be created before launch

    dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([SiteTheme, UserTheme, User, Topic, Message]);

export {sequelize};
