import { Schema, Document } from 'mongoose';

const UsersSchema = new Schema(
  {
    username: String,
    password: String,
    fullname: String,
    dateOfBirth: String,
    gender: String,
    email: String,
  },

  {
    // timestamps: true,
    collection: 'Users',
    toJSON: { virtuals: true },
  },
);

UsersSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'users',
  justOne: false,
});

export { UsersSchema };

export interface Users extends Document {
  username: string;
  password: string;
  fullname: string;
  dateOfBirth: string;
  gender: string;
  email: string;
}
