import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from "../services/contacts.js";
import createError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getContactsController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter
    });
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

    console.log(contact);

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
        return next(createError(404, 'Contact not found'));
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
        return next(createError(404, 'Contact not found'));
    }

    res.status(204).send();
};