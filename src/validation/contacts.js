import Joi from 'joi';

export const createContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.number().integer().min(6).max(16).required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean(),
});

export const updateContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.number().integer().min(6).max(16).required(),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean(),
});