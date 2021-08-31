import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import Message from './models/message';
import {SiteTheme} from './models/site_theme';
import Topic from './models/topic';
import User from './models/user';
import {UserTheme} from './models/user_theme';
import {createSiteTheme} from './pre-filling-theme';

const sequelizeOptions: SequelizeOptions = {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    host: process.env.NODE_ENV === "production" ? 'postgres' : 'localhost',
    port: 5432,
    database: 'crazybomber', //database name - should be created before launch
    dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([SiteTheme, UserTheme, User, Topic, Message]);

SiteTheme.sync({ alter: true });
UserTheme.sync({ alter: true });
User.sync({ alter: true });
Topic.sync({ alter: true });
Message.sync({ alter: true });

createSiteTheme();

export {sequelize};
