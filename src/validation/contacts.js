import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(6).max(16).required().messages({
    'string.base':
      'Phone number must be entered as text. Digits only, like `0931234567` or `+380931234567`',
    'string.empty': 'Phone number is required',
    'string.min': 'Phone number must be at least {#limit} characters long',
    'string.max': 'Phone number must be at most {#limit} characters long',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
    'string.base': 'Email must be a string',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of: work, home, or personal',
      'any.required': 'Contact type is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(6).max(16).optional().messages({
    'string.base':
      'Phone number must be entered as text. Digits only, like `0931234567` or `+380931234567`',
    'string.empty': 'Phone number is required',
    'string.min': 'Phone number must be at least {#limit} characters long',
    'string.max': 'Phone number must be at most {#limit} characters long',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
    'string.base': 'Email must be a string',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .optional()
    .messages({
      'any.only': 'Contact type must be one of: work, home, or personal',
    }),
});
