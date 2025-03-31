import { Item } from "@/lib/types/Item"; // Update with your correct file path
import Image from "next/image";

interface ItemsListProps {
  items: Item[];
}

const ItemsList = ({ items }: ItemsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {items.map((item) => (
        <div
          key={item._id.toString()}
          className="border p-4 rounded-md shadow-md"
        >
          <Image
            src={item.imageUrl!}
            alt={item.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-sm">{item.description}</p>
          <div className="mt-2">
            <span className="text-xs text-gray-500">{item.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
