import { Item } from "@/lib/types/Item";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const getButtonProperties = () => {
    switch (item.status) {
      case "Found":
        return {
          label: "Claim",
          color: "bg-green-500 hover:bg-green-600 text-white",
          type: "found",
        };
      case "Lost":
        return {
          label: "Report",
          color: "bg-red-500 hover:bg-red-600 text-white",
          type: "lost",
        };
      case "Claimed":
        return {
          label: "View Details",
          color: "bg-blue-500 hover:bg-blue-600 text-white",
          type: "",
        };
      default:
        return {
          label: "Action",
          color: "bg-gray-500 hover:bg-gray-600 text-white",
          type: "",
        };
    }
  };

  const { label, color, type } = getButtonProperties();

  return (
    <div className="relative border p-4 rounded-lg shadow-md w-full max-w-md mx-auto h-80 flex flex-col items-center">
      {/* Avatar in Top Left Corner */}
      <div className="absolute top-2 left-2 flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="/images/user-avatar.webp" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

      {/* Action Button in Top Right Corner */}
      <Link
        href={`/items/found?type=${type}&itemId=${item._id.toString()}`}
        passHref
      >
        <Button className={`absolute top-2 right-2 ${color}`}>{label}</Button>
      </Link>

      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={200}
          height={200}
          className="rounded-md"
        />
      )}
      <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
      <p className="text-sm text-gray-600">{item.category}</p>
      <p className="text-sm">{item.description}</p>
      <p className="text-sm font-bold">Location: {item.locationLostFound}</p>
      <p
        className={`text-sm font-bold ${
          item.status === "Lost" ? "text-red-500" : "text-green-500"
        }`}
      >
        {item.status}
      </p>
    </div>
  );
};

export default ItemCard;
