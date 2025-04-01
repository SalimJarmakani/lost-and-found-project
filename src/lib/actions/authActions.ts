"use server";

import connectDB from "@/lib/db";
import UserModel, { User } from "@/lib/types/User";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

await connectDB();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function loginAction(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const parsedData = loginSchema.parse(data);

  const user = await UserModel.findOne({ email: parsedData.email });

  if (
    !user ||
    !(await bcrypt.compare(parsedData.password, user.passwordHash))
  ) {
    return { error: "Invalid email or password" };
  }
  await createSession(user._id.toString(), user.email);

  redirect("/");
}

export async function registerAction(data: {
  name: string;
  email: string;
  password: string;
}) {
  await connectDB();

  const existingUser = await UserModel.findOne({ email: data.email });
  if (existingUser) {
    return { error: "Email is already in use" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 5);

  const newUser = new UserModel({
    name: data.name,
    email: data.email,
    passwordHash: hashedPassword,
  });

  await newUser.save();

  await createSession(newUser._id.toString(), newUser.email);

  redirect("/");
}

export async function getUserByEmail(email: string): Promise<User> {
  const user = await UserModel.findOne({ email: email });

  return user;
}

export async function signout() {
  await deleteSession();
  redirect("/login");
}
