import { Schema, model } from 'mongoose';

interface IUser {
  email: string;
  canvaAccessToken: string;
  canvaRefreshToken?: string;
  tokenExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    canvaAccessToken: {
      type: String,
      required: true,
    },
    canvaRefreshToken: {
      type: String,
      required: false,
    },
    tokenExpiresAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema); 