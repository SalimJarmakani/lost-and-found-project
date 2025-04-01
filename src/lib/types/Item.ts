import mongoose, { Schema, models } from "mongoose";
export type ItemStatus = "Lost" | "Found" | "Claimed";

export type ItemCategory =
  | "Electronics"
  | "Clothing"
  | "Documents"
  | "Accessories"
  | "Miscellaneous"
  | "Pets"
  | "Keys"
  | "Wallets"
  | "Jewelry"
  | "Bags"
  | "Books"
  | "Sporting Goods"
  | "Toys"
  | "Medical Items"
  | "Musical Instruments"
  | "Vehicles"
  | "ID Cards"
  | "Tickets"
  | "Glasses"
  | "Footwear"
  | "Tools"
  | "Kitchenware"
  | "Baby Items"
  | "Umbrellas"
  | "Luggage"
  | "Art Supplies"
  | "Camping Gear"
  | "School Supplies"
  | "Cameras"
  | "Chargers"
  | "Headphones"
  | "Hats"
  | "Scarves"
  | "Makeup"
  | "Notebooks"
  | "Gaming Devices"
  | "Collectibles"
  | "Other";

export interface Item {
  _id: string; // UUID or auto-generated ID
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  dateLostFound: Date;
  locationLostFound: string;
  imageUrl?: string;
  ownerId?: string; // User who lost or found the item
  rewardOffered?: boolean;
  rewardAmount?: number;
  claimedBy?: string; // User ID of claimer
  claimedAt?: Date;
  verificationStatus?: boolean;
  additionalInfo?: string;
}

const ItemSchema: Schema = new Schema<Item>(
  {
    title: { type: String },
    description: { type: String },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Documents",
        "Accessories",
        "Miscellaneous",
        "Pets",
        "Keys",
        "Wallets",
        "Jewelry",
        "Bags",
        "Books",
        "Sporting Goods",
        "Toys",
        "Medical Items",
        "Musical Instruments",
        "Vehicles",
        "ID Cards",
        "Tickets",
        "Glasses",
        "Footwear",
        "Tools",
        "Kitchenware",
        "Baby Items",
        "Umbrellas",
        "Luggage",
        "Art Supplies",
        "Camping Gear",
        "School Supplies",
        "Cameras",
        "Chargers",
        "Headphones",
        "Hats",
        "Scarves",
        "Makeup",
        "Notebooks",
        "Gaming Devices",
        "Collectibles",
        "Other",
      ],
    },
    status: {
      type: String,
      enum: ["Lost", "Found", "Claimed"],
    },
    dateLostFound: { type: Date },
    locationLostFound: { type: String },
    imageUrl: { type: String },
    ownerId: { type: String },
    rewardOffered: { type: Boolean, default: false },
    rewardAmount: { type: Number },
    claimedBy: { type: String },
    claimedAt: { type: Date },
    verificationStatus: { type: Boolean, default: false },
    additionalInfo: { type: String },
  },
  { timestamps: true }
);

const ItemModel = models.Item ?? mongoose.model<Item>("Item", ItemSchema);

export default ItemModel;
