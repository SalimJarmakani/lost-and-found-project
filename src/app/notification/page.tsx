import { getItemById } from "@/lib/actions/itemActions";
import { getNotificationById } from "@/lib/actions/notificationActions";
import { Item } from "@/lib/types/Item";
import { ReportNotification } from "@/lib/types/Notification";
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const itemId = params?.itemId as string;
  const notificationId = params?.notiId as string;

  const item: Item = await getItemById(itemId);
  const notification: ReportNotification = await getNotificationById(
    notificationId
  );

  // async function handleStatusChange(newStatus: string) {
  //   // await updateItemStatus(itemId, newStatus);
  //   // Optionally, trigger a revalidation or refresh action
  // }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Recent Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{notification.message}</p>
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
          <p className="text-sm text-gray-600">Status: {item.status}</p>
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
            <Select
              //   onValueChange={handleStatusChange}
              defaultValue={item.status}
            >
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
          <Button
            className="mt-4 w-full"
            // onClick={() => handleStatusChange(item.status)}
          >
            Update Status
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
