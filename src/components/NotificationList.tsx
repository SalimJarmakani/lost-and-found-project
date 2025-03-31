import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { getNotifications } from "@/lib/actions/notificationActions";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { ReportNotification } from "@/lib/types/Notification";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotificationList = async () => {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);
  const email: string | unknown = session?.email;
  const notifications: ReportNotification[] = await getNotifications(email);

  return (
    <div className="w-full p-4 max-w-md mx-auto">
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <Alert key={notif._id}>
            <Bell className="h-5 w-5" />
            <AlertTitle>{notif.type}</AlertTitle>
            <AlertDescription>
              {notif.message}

              <Link
                href={`/notification?notiId=${notif._id}&itemId=${notif.itemId}`}
                className="underline px-4 py-2 text-green-500 hover:bg-gray-700 rounded transition duration-300"
              >
                View
              </Link>
            </AlertDescription>
          </Alert>
        ))
      ) : (
        <Alert>
          <Bell className="h-5 w-5" />
          <AlertTitle>No Notifications Available</AlertTitle>
          <AlertDescription>Check Later!</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default NotificationList;
