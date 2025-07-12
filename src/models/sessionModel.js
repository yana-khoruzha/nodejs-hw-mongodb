import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, unique: true, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const SessionsCollection = model('Session', sessionSchema);
