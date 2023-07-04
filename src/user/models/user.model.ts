import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    roles: [String],
  },

  {
    // timestamps: true,
    collection: 'User',
    toJSON: { virtuals: true },
  },
);

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

export { UserSchema };

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
}
