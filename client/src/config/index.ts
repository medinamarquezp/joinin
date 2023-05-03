import { config as devConfig } from './dev.config';
import { config as prodConfig } from './prod.config';

export const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
