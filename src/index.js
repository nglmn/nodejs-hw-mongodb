import { setupServer } from "./server";
import { initMongoConnection } from './db/initMongoDB.js';

const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
};

bootstrap();