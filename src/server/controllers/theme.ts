import {Request, Response} from 'express';
import {SiteTheme} from '../db/models/site_theme';
import {UserTheme} from '../db/models/user_theme';

export const getThemeHandler = async (req: Request, res: Response): Promise<void> => {
    if (req.query.id && typeof req.query.id !== 'string') {
        throw Error('wrong params');
    }

    const find: () => Promise<SiteTheme | SiteTheme[] | null> = () => {
        if (req.query.id) {
            return SiteTheme.findByPk(req.query.id as string);
        }
        if (req.query.theme) {
            return SiteTheme.findOne({
                where: {
                    theme: req.query.theme,
                },
            });
        }
        return SiteTheme.findAll({});
    };
    const themes = await find();
    res.send(themes);
};

export const writeThemeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        await UserTheme.create(req.body);
        res.send('ok');
    } catch (err) {
        res.status(500).send('db error');
    }
};

export const updateThemeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await UserTheme.findOne({
            where: {user_id: req.body.user_id},
        });
        user.theme_id = req.body.theme_id;
        await user.save();
        res.send('ok');
    } catch (err) {
        res.status(500).send('db error');
    }
};

export const getUserTheme = async (req: Request, res: Response): Promise<void> => {
    if (req.query.user_id && typeof req.query.user_id !== 'string') {
        res.status(500).send('wrong params');
        return;
    }

    const find: () => Promise<string | undefined | Response> = () => {
        return UserTheme.findOne({
            where: {
                user_id: req.query.user_id,
            },
        }).then((theme) => theme?.theme_id);
    };

    try {
        const theme_id = await find();
        res.send({theme_id: theme_id});
    } catch (e) {
        res.status(404).send('not found');
    }
};

export const writeNewTheme = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    try {
        await SiteTheme.create(req.body as any);
    } catch (err) {
        res.send('db error');
    }
    res.send('ok');
};
