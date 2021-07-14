import {Configuration} from 'webpack';
import merge from 'webpack-merge';
import appPreset from '../parts/app-preset';
import basePreset from '../parts/base-preset';
import devPreset from '../parts/development-preset';
import prodPreset from '../parts/production-preset';

/**
 * В зависимости от режима подгружаем нужный пресет. Клиентский конфиг.
 */
export default function (mode: 'development' | 'production'): Configuration {
    console.log('[client built in mode]: ', mode);
    return merge<Configuration>(
        appPreset(mode),
        basePreset(mode),
        mode === 'development' ? devPreset() : prodPreset()
    );
}
