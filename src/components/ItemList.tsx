import { Item } from "@/lib/types/Item";
import Image from "next/image";
import Link from "next/link";
interface ItemsListProps {
  items: Item[];
}

const ItemsList = ({ items }: ItemsListProps) => {
  function itemStatus(status: string) {
    switch (status) {
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
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 justify-items-center">
        {items.map((item) => (
          <div
            key={item._id.toString()}
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group w-full max-w-xs"
          >
            <div className="w-full h-48 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800">
              <Image
                src={item.imageUrl || "/images/placeholder.jpg"}
                alt={item.title}
                width={200}
                height={200}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <Link
              href={`/items/found?type=${
                itemStatus(item.status).type
              }&itemId=${item._id.toString()}`}
              passHref
            >
              <h3 className="text-lg font-semibold text-white mt-4 transition-colors group-hover:text-blue-400">
                {item.title}
              </h3>
            </Link>
            <p className="text-sm text-zinc-300 mt-1 line-clamp-2 transition-colors group-hover:text-zinc-100">
              {item.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full group-hover:bg-zinc-700 transition-colors">
                {item.category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full transition-colors ${
                  item.status === "Lost"
                    ? "bg-red-600 text-white group-hover:bg-red-500"
                    : item.status === "Found"
                    ? "bg-green-600 text-white group-hover:bg-green-500"
                    : "bg-yellow-600 text-black group-hover:bg-yellow-500"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
