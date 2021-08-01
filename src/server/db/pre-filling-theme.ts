import {SiteTheme} from './models/site_theme';

export const createSiteTheme = async (): Promise<void> => {
    try {
        await SiteTheme.findOrCreate({
            where: {theme: 'RED'},
            defaults: {
                theme: 'RED',
            },
        });
        await SiteTheme.findOrCreate({
            where: {theme: 'GREY'},
            defaults: {
                theme: 'GREY',
            },
        });
        await SiteTheme.findOrCreate({
            where: {theme: 'GREEN'},
            defaults: {
                theme: 'GREEN',
            },
        });
    } catch (err) {
        Error('db error');
    }
};
