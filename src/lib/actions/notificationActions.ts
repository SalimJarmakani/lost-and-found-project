"use server";

import mongoose from "mongoose";
import ReportNotificationModel, {
  ReportNotification,
} from "@/lib/types/Notification";
import connectDB from "@/lib/db";

interface CreateReportNotificationData {
  userId: string;
  email: string;
  type: string;
  message: string;
  itemId: string;
}

interface CreateReportNotificationResponse {
  success: boolean;
  reportNotification?: ReportNotification;
  error?: string;
}

export async function createReportNotification(
  data: CreateReportNotificationData
): Promise<CreateReportNotificationResponse> {
  try {
    await connectDB();

    const newReportNotification = new ReportNotificationModel({
      userId: new mongoose.Types.ObjectId(data.userId),
      type: data.type,
      message: data.message,
      email: data.email,
      read: false,
      itemId: data.itemId,
    });

    await newReportNotification.save();
    return { success: true };
  } catch (error) {
    console.error("Error creating report notification:", error);
    return { success: false, error: "Error" };
  }
}

export async function getNotifications(
  email: string | unknown
): Promise<ReportNotification[]> {
  await connectDB();

  const notifications = await ReportNotificationModel.find({ email: email });

  return notifications;
}

export async function getNotificationById(
  id: string
): Promise<ReportNotification> {
  const notification = await ReportNotificationModel.findById(id);

  return notification;
}
