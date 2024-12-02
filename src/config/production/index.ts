class Config {
    constructor() {
    }

    getPort() {
        return process.env.PORT ? process.env.PORT : 443;
    }

    getTokenExpirationTime() {
        return process.env.TOKEN_EXPIRATION_TIME;
    }

    getTokenSecret() {
        return process.env.TOKEN_SECRET;
    }

    getFcmServerKey() {
        return process.env.FCM_SERVER_KEY;
    }
}

class DbConfig {
    //TODO: Please add proper credentials here
    getUser(){ return process.env.DB_USER }
    getHost(){ return process.env.DB_HOST }
    getDatabase(){ return process.env.DB_DATABASE }
    getPassword(){ return process.env.DB_PASSWORD  }
    getPort(){ return process.env.DB_PORT }    
    getSentryEnv(){ return process.env.SENTRY_ENV }
    redisIp(){ return process.env.REDIS_IP }
}

const config = {
    serverConfig: new Config(),
    dbConfig: new DbConfig(),
};

// Export the entire config object
export default config;
