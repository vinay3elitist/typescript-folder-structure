import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import https from 'https';
import Routes from './routes';
import DbConnection from './db';

class Server {
    private app: Application;
    private port?: number;
    private config: Record<string, any> | null;
    private connection?: DbConnection;
    private routes?: Routes;

    constructor(config: Record<string, any> | null) {
        this.app = express();
        this.config = config;

        this.initializeDbConnection();
        this.initializeApp();
    }

    public initializeDbConnection() {
        if(this.config) {
            this.connection = new DbConnection(this.config);
        }
    }

    private initializeApp(): void {
        this.initConfig();
        this.setMiddlewares();
        this.setComponents();
    }

    private initConfig(): void {
        if (this.config) {
            this.port = this.config.serverConfig.getPort();
            this.app.set('port', this.port);
            this.app.set('view engine', 'ejs');
        } else {
            throw new Error('Configuration is not provided');
        }
    }


    private setMiddlewares(): void {
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(helmet());
        const corsOptions = {
            origin: ['*'],
            credentials: true,
        }
        this.app.options('*', cors(corsOptions));
        this.app.use(cors(corsOptions));
    }
    
    private setComponents(): void {
        this.routes = new Routes(this.app);
    }

    public startServer(): void {
        if (process.env.NODE_ENV !== "prod") {
            console.log("\nStarting server...", process.env.NODE_ENV);
            this.app.listen(this.port, () => {
                console.log(`Server is running on port : ${this.port}`);
            });
        } else {
            const options = {
                key: fs.readFileSync(`/etc/letsencrypt/live/api.quirkplus.com/privkey.pem`),
                cert: fs.readFileSync(`/etc/letsencrypt/live/api.quirkplus.com/fullchain.pem`),
            };
            console.log("Options", options);
            https.createServer(options, this.app).listen(this.port, () => {
                console.log(`Server is running on port : ${this.port}`);
            });
            this.app.listen(process.env.HTTP_PORT, () => {
                console.log(`Server is running on port : ${process.env.HTTP_PORT}`);
            });
        }

        this.isServerUp();
    }

    private isServerUp(): void {
        this.app.get('/health', (req: Request, res: Response) => {
            res.send("Server is up");
        })
    }

    public getApp(): Application {
        return this.app;
    }
}

export default Server;