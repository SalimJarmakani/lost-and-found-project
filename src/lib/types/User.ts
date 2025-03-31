import mongoose, { Schema } from "mongoose";
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phoneNumber: { type: String, default: null },
    profileImageUrl: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

var UserModel;

if (!mongoose.models.User) {
  UserModel = mongoose.model<User>("User", UserSchema);
}

export default mongoose.models.User || UserModel!;
