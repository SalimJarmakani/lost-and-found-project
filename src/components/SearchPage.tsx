"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ItemsList from "@/components/ItemList";
import { Item } from "@/lib/types/Item";
import { getSearchItems } from "@/lib/actions/itemActions";
export default function SearchPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getSearchItems(); // Calling the server action
      setItems(items);
      setFilteredItems(items);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <SearchBar items={items} onSearch={setFilteredItems} />
      <ItemsList items={filteredItems} />
    </div>
  );
}
