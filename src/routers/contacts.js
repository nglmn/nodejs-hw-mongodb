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
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIDController));
router.post('/contacts',
    validateBody(createContactSchema),
    ctrlWrapper(createContactController));
router.patch('/contacts/:contactId',
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;