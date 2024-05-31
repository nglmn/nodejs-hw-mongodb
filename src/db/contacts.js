import { model, Schema } from 'mongoose';

const ContactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            email: 'email',
            optional: true
        },
        isFavourite: {
            type: Boolean,
            default: false
        },
        contactType: {
            type: String,
            required: true,
            enum: ['work', 'home', 'personal'],
            default: 'personal'
        },
        createdAt: {
            timestamps: true
        },
        updatedAt: {
            timestamps: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ContactsCollection = model('contacts', ContactSchema);
