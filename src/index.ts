import dotenv from 'dotenv';
dotenv.config();

import Server from './app';
import config from './config';
const newServer = new Server(config);
newServer.startServer();

export default newServer.getApp();