import mongoose from "mongoose";

class DbConnection {
    private config: Record<string, any>;

    constructor(config: Record<string, any>) {
        this.config = config;
        this.initialize();
    }

    private initialize(): void {
        const connectionString = process.env.MONGODB_URI;

        if (!connectionString) {
            console.error('MongoDB connection string is not defined in the environment variables.');
            throw new Error('MongoDB connection string is missing');
        }

        mongoose
            .connect(connectionString)
            .then(() => {
                console.log('Database connection successful\n');
            })
            .catch((error) => {
                console.error('Error connecting to the database:', error);
            });

        mongoose.set('strictQuery', false); // Replacing deprecated `useFindAndModify`
    
    }
}

export default DbConnection;