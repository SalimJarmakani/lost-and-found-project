"use server";

import ItemModel, { Item } from "@/lib/types/Item";
import connectDB from "@/lib/db";

export async function createItem(data: Item) {
  try {
    await connectDB();

    const newItem = new ItemModel({
      title: data.title,
      description: data.description,
      category: data.category,
      status: data.status,
      dateLostFound: new Date(data.dateLostFound),
      locationLostFound: data.locationLostFound,
      imageUrl: data.imageUrl,
      ownerId: data.ownerId,
      rewardOffered: data.rewardOffered || false,
      rewardAmount: data.rewardAmount || 0,
      additionalInfo: data.additionalInfo,
    });

    const savedItem = await newItem.save();
    return { success: true, item: savedItem };
  } catch (error) {
    console.error("Error creating item:", error);
    return { success: false, error: "error" };
  }
}

export async function getItems() {
  try {
    await connectDB();
    const items = await ItemModel.find({});
    return { success: true, items };
  } catch (error) {
    console.error("Error getting items:", error);
    return { success: false, error: "error" };
  }
}

export async function getSearchItems() {
  try {
    await connectDB();
    const itemModels = await ItemModel.find({});

    const items = JSON.parse(JSON.stringify(itemModels));
    return items;
  } catch (error) {
    console.error("Error getting items:", error);
    return [];
  }
}

export async function getItemById(id: string): Promise<Item> {
  try {
    await connectDB();
    const item = await ItemModel.findById(id);
    return item;
  } catch (error) {
    console.error("Error getting items:", error);
    return new ItemModel();
  }
}
