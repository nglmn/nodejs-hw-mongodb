import { ContactsCollection } from "../db/contacts";

export const getAllContacts = async () => {
    const students = await ContactsCollection.find();
    return students;
};

export const getContactById = async (studentId) => {
    const student = await ContactsCollection.findById(studentId);
    return student;
};