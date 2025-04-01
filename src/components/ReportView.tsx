"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { updateStatus } from "@/lib/actions/itemActions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/lib/types/Item";
import { User } from "@/lib/types/User";
import { ReportNotification } from "@/lib/types/Notification";

export default function ReportView({
  item,
  user,
  notification,
}: {
  item: Item;
  user: User;
  notification: ReportNotification;
}) {
  const [status, setStatus] = useState<string>(item.status);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleUpdateClick = async () => {
    try {
      const success = await updateStatus(item._id, status);
      if (success) {
        toast({
          title: "Updated Status Succesfully",
          description: `Item Status is now ${status}`,
        });
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      alert("An error occurred while updating status.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Reported By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-gray-300 text-sm">Name:</span>
            <span className="text-white font-medium">{user.name}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-gray-300 text-sm">Email:</span>
            <span className="text-white font-medium">{user.email}</span>
          </div>
          <div className="flex flex-col space-y-1 border-t pt-3">
            <span className="text-gray-300 text-sm">Notification:</span>
            <p className="text-gray-400 text-sm">{notification.message}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">{item.title}</p>
          <p className="text-sm text-gray-600">Category: {item.category}</p>
          <p className="text-sm text-gray-600">
            Description: {item.description}
          </p>
          <p className="text-sm text-gray-600">Status: {status}</p>
          <p className="text-sm text-gray-600">
            Date Lost/Found: {new Date(item.dateLostFound).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Location: {item.locationLostFound}
          </p>
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={200}
              height={200}
              className="mt-2 w-full h-40 object-cover rounded-lg"
            />
          )}
          {item.rewardOffered && (
            <p className="text-sm text-green-600">
              Reward: ${item.rewardAmount}
            </p>
          )}
          <p className="text-sm text-gray-600">
            Owner ID: {item.ownerId || "N/A"}
          </p>
          {item.claimedBy && (
            <p className="text-sm text-gray-600">
              Claimed By: {item.claimedBy}
            </p>
          )}
          {item.claimedAt && (
            <p className="text-sm text-gray-600">
              Claimed At: {new Date(item.claimedAt).toLocaleDateString()}
            </p>
          )}
          <p className="text-sm text-gray-600">
            Verification Status:{" "}
            {item.verificationStatus ? "Verified" : "Not Verified"}
          </p>
          {item.additionalInfo && (
            <p className="text-sm text-gray-600">
              Additional Info: {item.additionalInfo}
            </p>
          )}

          <div className="mt-4">
            <Select onValueChange={handleStatusChange} defaultValue={status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="found">Found</SelectItem>
                <SelectItem value="claimed">Claimed</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="mt-4 w-full" onClick={handleUpdateClick}>
            Update Status
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
