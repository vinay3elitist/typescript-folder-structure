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
    getUser(){ return process.env.DB_USER }
    getHost(){ return process.env.DB_HOST }
    getDatabase(){ return process.env.DB_DATABASE }
    getPassword(){ return process.env.DB_PASSWORD  }
    getPort(){ return process.env.DB_PORT }    
    getSentryEnv(){ return "testing" }
}


class Aws {
    getAccessKey() { return process.env.S3ACCESSKEY}
    getSecretKey() { return process.env.S3SKEY }
    getBucketName() { return process.env.BUCKETNAME }
    getRegion() { return process.env.S3REGION }
    getPublicPath() { return process.env.S3PUBLIC_PATH }
}

const config = {
    serverConfig: new Config(),
    dbConfig: new DbConfig(),
};

// Export the entire config object
export default config;