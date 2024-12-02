class Config {
    constructor() {
    }

    getPort() {
        return process.env.port ? process.env.port : 443;
    }

    getTokenExpirationTime() {
        return 21600;
    }

    getTokenSecret() {
        return process.env.TOKEN_SECRET;
    }

    getFcmServerKey() {
        return process.env.FCM_SERVER_KEY;
    }
}

class DbConfig {
    getUser(){ return process.env.DB_USER }
    getHost(){ return process.env.DB_HOST }
    getDatabase(){ return process.env.DB_DATABASE }
    getPassword(){ return process.env.DB_PASSWORD  }
    getPort(){ return process.env.DB_PORT }    
    getSentryEnv(){ return "Staging" }
}

const config = {
    serverConfig: new Config(),
    dbConfig: new DbConfig(),
};

// Export the entire config object
export default config;
