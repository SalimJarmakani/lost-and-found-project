import mongoose, { models, Schema } from "mongoose";

export interface ReportNotification {
  _id: string;
  email: string;
  type: string;
  message: string;
  read: boolean;
  itemId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReportNotificationSchema: Schema = new Schema(
  {
    userId: { type: String, ref: "User", required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    email: { type: String },
    itemId: { type: String },
  },
  {
    timestamps: true,
  }
);

const ReportNotificationModel =
  models.ReportNotification ??
  mongoose.model<ReportNotification>(
    "ReportNotification",
    ReportNotificationSchema
  );

export default ReportNotificationModel;
