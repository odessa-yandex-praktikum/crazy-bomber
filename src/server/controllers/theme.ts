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
    console.log(themes);
    if (themes) {
        res.send(themes);
    } else {
        res.status(404).send('not found');
    }

};

export const getUserTheme = async (req: Request, res: Response): Promise<void> => {
    if (req.query.user_id && typeof req.query.user_id !== 'string') {
        throw Error('wrong params');
    }

    const find: () => Promise<UserTheme | null | UserTheme[] > | undefined = () => {
        if (req.query.user_id) {
            return UserTheme.findOne({
            where: {
                user_id: Number(req.query.user_id),
            },
        }
            )}
    };

        const theme_id = await find();
        console.log(theme_id);
        if (theme_id){
            res.send( theme_id);
        } else{
            res.status(404).send('not found');
        }

};

export const createSiteTheme = async (): Promise<void> => {
    try {
        await SiteTheme.findOrCreate({
            where: { theme: 'RED' },
            defaults: {
                theme: 'RED',
            }
        });
        await SiteTheme.findOrCreate({
            where: { theme: 'GREY' },
            defaults: {
                theme: 'GREY',
            }
        });
        await SiteTheme.findOrCreate({
            where: { theme: 'GREEN' },
            defaults: {
                theme: 'GREEN',
            }
        });
    } catch (err) {
        Error('db error');
    }
};

export const updateThemeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await UserTheme.findOne({
            where: {user_id: req.body.user_id},
        });
        if (user){
            user.theme_id = req.body.theme_id;
            await user?.save();
            res.send('ok');
        }
    } catch (err) {
        res.status(500).send('db error');
    }
};



export const writeNewTheme = async (req: Request, res: Response): Promise<void> => {
    try {
        await SiteTheme.create(req.body);
        res.send('ok');
    } catch (err) {
        res.status(500).send('db error');
    }
};

export const writeThemeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        await UserTheme.create({user_id: req.body.user_id, theme_id: req.body.theme_id} as UserTheme);
        res.send('ok');
    } catch (err) {
        res.status(500).send('db error');
    }
};