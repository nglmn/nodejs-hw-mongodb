import { setupServer } from "./server.js";
import { initMongoConnection } from './db/initMongoDB.js';

const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
    console.log("start");
};

bootstrap();