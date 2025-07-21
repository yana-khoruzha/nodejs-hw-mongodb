import { Contact } from '../models/contactModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const cleanFilter = {};
  for (const key in filter) {
    if (filter[key] !== undefined) {
      cleanFilter[key] = filter[key];
    }
  }

  const query = { ...cleanFilter, userId };

  console.log('🔍 QUERY for Contact.find:', query);

  const [contactsCount, contacts] = await Promise.all([
    Contact.countDocuments(query),
    Contact.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({ ...payload, userId });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};

export const updateContact = async (contactId, payload, options = {}) => {
  const query = { _id: contactId, userId: options.userId };
  const contact = await Contact.findOneAndUpdate(query, payload, {
    new: true,
    upsert: options.upsert || false,
  });
  return contact
    ? { contact, isNew: options.upsert && !contact.updatedAt }
    : null;
};
