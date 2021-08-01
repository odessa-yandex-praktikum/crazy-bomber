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

    const find: () => Promise<UserTheme | null | UserTheme[]> | undefined = () => {
        if (req.query.user_id) {
            return UserTheme.findOne({
                where: {
                    user_id: Number(req.query.user_id),
                },
            });
        }
    };

    const theme_id = await find();
    if (theme_id) {
        res.send(theme_id);
    } else {
        res.status(404).send('not found');
    }
};

export const updateThemeHandler = async (req: Request, res: Response): Promise<void> => {
    const updated: () => Promise<[number, UserTheme[]]> | undefined = () => {
        if (req.body.user_id) {
            return UserTheme.update(
                {
                    theme_id: req.body.theme_id,
                },
                {
                    where: {user_id: req.body.user_id},
                }
            );
        }
    };
    try {
        await updated();
        res.status(200).send();
    } catch (err) {
        res.status(500).send('db error');
    }
};

export const writeNewTheme = async (req: Request, res: Response): Promise<void> => {
    try {
        await SiteTheme.create(req.body);
        res.status(200).send();
    } catch (err) {
        res.status(500).send('db error');
    }
};

export const writeThemeHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        await UserTheme.create({
            user_id: req.body.user_id,
            theme_id: req.body.theme_id,
        } as UserTheme);
        res.status(200).send();
    } catch (err) {
        res.status(500).send('db error');
    }
};
