import devConfig from './development';
import prodConfig from './production';
import testConfig from './testing';
import stagConfig from './staging';

let config: Record<string, any> | null = null;
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        config = { serverConfig: prodConfig.serverConfig, dbConfig: prodConfig.dbConfig };
        break;
    case 'stage':
    case 'staging':
        config = { serverConfig: stagConfig.serverConfig, dbConfig: stagConfig.dbConfig };
        break;
    case 'test':
    case 'testing':
        config = { serverConfig: testConfig.serverConfig, dbConfig: testConfig.dbConfig };
        break;
    case 'dev':
    case 'development':
        config = { serverConfig: devConfig.serverConfig, dbConfig: devConfig.dbConfig };
        break;
    default:
        config = { serverConfig: prodConfig.serverConfig, dbConfig: prodConfig.dbConfig };
}

export default config;