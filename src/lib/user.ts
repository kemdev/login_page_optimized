import { IUser } from '@/types/user';
import mongoose, { Schema } from 'mongoose';

const connect1 = mongoose.createConnection(process.env.MONGODB_URI as string);

const userSchema = new Schema<IUser>({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: Boolean,
  emailVerificationToken: String,
  password: {
    type: String,
    required: true,
  },
  resetToken: String, // token to change your password
  token: {
    // access token - generated when user is logging in
    type: String,
  },
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
});

export const User = connect1.model<IUser>('Users', userSchema);
