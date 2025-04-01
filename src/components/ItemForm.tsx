"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createItem } from "@/lib/actions/itemActions";
import { Item } from "@/lib/types/Item";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  category: z.enum([
    "Electronics",
    "Clothing",
    "Documents",
    "Accessories",
    "Miscellaneous",
    "Pets",
    "Keys",
    "Wallets",
    "Jewelry",
    "Bags",
    "Books",
    "Sporting Goods",
    "Toys",
    "Medical Items",
    "Musical Instruments",
    "Vehicles",
    "ID Cards",
    "Tickets",
    "Glasses",
    "Footwear",
    "Tools",
    "Kitchenware",
    "Baby Items",
    "Umbrellas",
    "Luggage",
    "Art Supplies",
    "Camping Gear",
    "School Supplies",
    "Cameras",
    "Chargers",
    "Headphones",
    "Hats",
    "Scarves",
    "Makeup",
    "Notebooks",
    "Gaming Devices",
    "Collectibles",
    "Other",
  ]),
  status: z.enum(["Lost", "Found", "Claimed"]),
  dateLostFound: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Please enter a valid date.",
  }),
  locationLostFound: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  imageUrl: z.string(),
  rewardOffered: z.boolean().optional(),
  rewardAmount: z
    .union([z.number(), z.string()])
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Reward cannot be negative.",
    }),
  additionalInfo: z.string().optional(),
});
type ItemType = z.infer<typeof formSchema>;
export function ItemForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Miscellaneous",
      status: "Lost",
      dateLostFound: "",
      locationLostFound: "",
      imageUrl: "",
      rewardOffered: false,
      rewardAmount: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: ItemType) => {
    const newItem: Item = {
      _id: "",
      title: data.title,
      description: data.description,
      category: data.category,
      status: data.status,
      dateLostFound: new Date(data.dateLostFound),
      locationLostFound: data.locationLostFound,
      imageUrl: data.imageUrl || undefined,
      rewardOffered: data.rewardOffered,
      rewardAmount: data.rewardAmount ? Number(data.rewardAmount) : undefined,
      additionalInfo: data.additionalInfo || undefined,
    };
    await createItem(newItem);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800">
      <h2 className="text-3xl font-bold text-white mb-8">
        Report Lost or Found Item
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Item Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the item..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formSchema.shape.category.options.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Lost">Lost</SelectItem>
                      <SelectItem value="Found">Found</SelectItem>
                      <SelectItem value="Claimed">Claimed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="dateLostFound"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Date Lost/Found</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationLostFound"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Campus Library, Bus Stop..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="rewardOffered"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="text-zinc-300">
                    Reward Offered
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rewardAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Reward Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Additional Info</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Optional additional details..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
