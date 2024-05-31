import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World!',
        });
    });
    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.status(200).json({
            data: contacts,
        });
    });
    app.get('/contacts/:contactId', async (req, res) => {
        const { studentId } = req.params;
        const contact = await getContactById(studentId);

        res.status(200).json({
            data: contact,
        });
        res.status(404).json({
            message: 'Not found',
        });
    });
    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });
    app.use((err, req, res) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};