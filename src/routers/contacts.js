import { Router } from 'express';
import {
    getContactsController,
    getContactByIDController,
    createContactController,
    patchContactController,
    deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactsSchema, updateContactsSchema } from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId',
    validateBody(createContactsSchema),
    ctrlWrapper(getContactByIDController));
router.post('/contacts',
    validateBody(updateContactsSchema),
    ctrlWrapper(createContactController));
router.patch('/contacts/:contactId',
    validateBody(updateContactsSchema),
    ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;