import { Application } from 'express';
// import User from './user.routes';

class Routes {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
        this.initModules();
    }

    private initModules(): void {
        // Initialize the User module with the Express application
        // const userObj = new User(this.app);
    }
}

export default Routes;
