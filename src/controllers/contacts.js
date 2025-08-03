import {
  getAllContacts,
  getContactById,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { Contact } from '../models/contactModel.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contactData = { ...req.body, userId };

  if (req.file) {
    const photoUrl = await saveFileToCloudinary(req.file);
    contactData.photo = photoUrl;
  }

  const newContact = await Contact.create(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const contactData = { ...req.body, userId };

  if (req.file) {
    const photoUrl = await saveFileToCloudinary(req.file);
    contactData.photo = photoUrl;
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    contactData,
    { new: true, upsert: true }
  );

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Contact upserted successfully',
    data: updatedContact,
  });
};

export const patchContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const filter = { _id: contactId, userId };
  const updateData = { ...req.body };

  if (req.file) {
    const photoUrl = await saveFileToCloudinary(req.file);
    updateData.photo = photoUrl;
  }

  const updatedContact = await Contact.findOneAndUpdate(
    filter,
    updateData,
    { new: true }
  );

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};
