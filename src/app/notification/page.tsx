import { getItemById } from "@/lib/actions/itemActions";
import { getNotificationById } from "@/lib/actions/notificationActions";
import { Item } from "@/lib/types/Item";
import { ReportNotification } from "@/lib/types/Notification";
import { User } from "@/lib/types/User";
import { getUserByEmail } from "@/lib/actions/authActions";
import ReportView from "@/components/ReportView";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const itemId = params?.itemId as string;
  const notificationId = params?.notiId as string;

  const item: Item = JSON.parse(JSON.stringify(await getItemById(itemId)));
  const notification: ReportNotification = JSON.parse(
    JSON.stringify(await getNotificationById(notificationId))
  );

  const user: User = JSON.parse(
    JSON.stringify(await getUserByEmail(notification.email))
  ) as User;

  return (
    <div>
      <ReportView item={item} user={user} notification={notification} />
    </div>
  );
}
