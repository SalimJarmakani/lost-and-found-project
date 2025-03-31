import { Item } from "@/lib/types/Item";
import ItemCard from "@/components/ItemCard"; // Import the new component
import { getItems } from "@/lib/actions/itemActions";

const staticItems: Item[] = [
  {
    _id: "1",
    title: "Lost Phone",
    description: "Black iPhone 12 lost near the park.",
    category: "Electronics",
    status: "Lost",
    dateLostFound: new Date("2024-02-01"),
    locationLostFound: "Central Park",
    imageUrl: "/images/Iphone.webp",
  },
  {
    _id: "2",
    title: "Wallet Found",
    description: "Brown leather wallet found at the mall.",
    category: "Accessories",
    status: "Found",
    dateLostFound: new Date("2024-02-03"),
    locationLostFound: "City Mall",
    imageUrl: "/images/Iphone.webp",
  },
];

export default async function FeedPage() {
  const results = await getItems(); // Fetch items from the database

  const itemsToShow = results.success ? results.items : staticItems;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        {itemsToShow!.map((item: Item) => (
          <ItemCard key={item._id.toString()} item={item} />
        ))}
      </div>
    </div>
  );
}
