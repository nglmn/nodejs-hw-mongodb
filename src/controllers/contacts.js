import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from "../services/contacts.js";
import createError from 'http-errors';

export const getContactsController = async (req, res, next) => {
    const contacts = await getAllContacts();
    if (!contacts) {
        next(createError(404, 'Contacts not found'));
        return;
    }
    res.json({
        status: 200,
        data: contacts,
        message: "Successfully found contacts!"
    });
};

export const getContactByIDController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        // return next(createHttpError(404, 'Contact not found'));
        return next(createError(404, "Contacts not found"));
    }

    res.json({
        status: 200,
        data: contact,
        message: `Successfully found contact with id ${contactId}!`,
    });

};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
        next(createError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully patched a contact!`,
        data: result.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};