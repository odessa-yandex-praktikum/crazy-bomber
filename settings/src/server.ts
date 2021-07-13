import bodyParser from 'body-parser';
import {sequelize} from './db';
import {SiteTheme} from './site_theme';
import {UserTheme} from './user_theme';

const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
import {Express, Router, Request, Response} from 'express';

const router: Router = Router();

const server: Express = express();
const PORT = process.env.PORT || 4500;

sequelize.addModels([SiteTheme, UserTheme]);

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());


server.get('/get-theme', async (req: Request, res: Response) => {
    if (req.query.id && typeof req.query.id !== 'string') {
        throw Error('wrong params');
    }
    const find: () => Promise<SiteTheme> | Promise<SiteTheme[]> = () => {
        if (req.query.id) {
            return SiteTheme.findByPk(req.query.id as string);
        }
        if (req.query.theme) {
            return SiteTheme.findOne({
                where: {
                    theme: req.query.theme
                }
            });
        }
        return SiteTheme.findAll({});
    };
    const themes = await find();
    res.send(themes);
});

server.post('/write-user-theme', async (req: Request, res: Response) => {
    try {
        await UserTheme.create(req.body);
        res.send('ok');
    } catch (err) {
        res.status(500).send('db error');
    }
});

server.post('/update-user-theme', async (req: Request, res: Response) => {
    try {
        const user = await UserTheme.findOne({
            where: {user_id: req.body.user_id}
        });
        user.theme_id = req.body.theme_id;
        await user.save();
        res.send('ok');
    } catch (err) {
        res.status(500).send('db error');
    }
});

server.get('/get-user-theme', async (req: Request, res: Response) => {

    if (req.query.user_id && typeof req.query.user_id !== 'string') {
        res.status(500).send('wrong params');
        return;
    }

    const find: () => Promise<string | Response> = () => {
        return UserTheme.findOne({
            where: {
                user_id: req.query.user_id
            }
        })
            .then((theme) => theme.theme_id);
    };

    try {
        const theme_id = await find();
        res.send({theme_id: theme_id});
    } catch (e) {
        res.status(404).send('not found');
    }
});

server.get('/write-new-theme', async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        await SiteTheme.create(req.body as any);
    } catch (err) {
        res.send('db error');
    }
    res.send('ok');
});

server.disable('x-powered-by').enable('trust proxy').use(cookieParser).use(router);


(async function () {
    await sequelize.sync();
    server.listen(PORT, function () {
        console.log(`Open http://localhost:${PORT}!`);
    });
})();
