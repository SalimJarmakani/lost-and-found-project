import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Item } from "@/lib/types/Item";

interface SearchBarProps {
  items: Item[];
  onSearch: (filteredItems: Item[]) => void;
}

const SearchBar = ({ items, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleSearch = () => {
    const filteredItems = items.filter((item) => {
      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus;
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesQuery;
    });

    onSearch(filteredItems);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs p-2 border rounded-md"
        />
      </div>

      <div className="flex space-x-4">
        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
            <SelectItem value="Found">Found</SelectItem>
            <SelectItem value="Claimed">Claimed</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Documents">Documents</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
