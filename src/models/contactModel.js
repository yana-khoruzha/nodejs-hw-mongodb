import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: [true, 'Contact type is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },  
  },
  {
    timestamps: true,
  },
);

export const Contact = model('Contact', contactSchema);
