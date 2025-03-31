import mongoose from "mongoose";
import { Item } from "@/lib/types/Item";
export const staticItems: Item[] = [
  {
    _id: "1",
    title: "Lost Phone",
    description: "Black iPhone 12 lost near the park.",
    category: "Electronics",
    status: "Lost",
    dateLostFound: new Date("2024-02-01"),
    locationLostFound: "Central Park",
    imageUrl: "/images/Iphone.webp",
  },
  {
    _id: "2",
    title: "Wallet Found",
    description: "Brown leather wallet found at the mall.",
    category: "Accessories",
    status: "Found",
    dateLostFound: new Date("2024-02-03"),
    locationLostFound: "City Mall",
    imageUrl: "/images/Iphone.webp",
  },
];

const dbURI: string = process.env.Database_URL!;

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(dbURI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
