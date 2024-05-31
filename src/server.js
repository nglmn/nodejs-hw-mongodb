import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const test = 'uou';
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
    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await getAllContacts();
            res.json({
                status: 200,
                data: contacts,
                message: "Successfully found contacts!"
            });
        } catch (error) {
            res.json({
                status: 404,
                message: error.message,
            });
        }
    });
    app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactById(contactId);
            res.json({
                status: 200,
                data: contact,
                message: `Successfully found contact with id ${contactId}!`,
            });
        } catch (error) {
            res.json({
                status: 404,
                message: error.message,
            });
        }
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