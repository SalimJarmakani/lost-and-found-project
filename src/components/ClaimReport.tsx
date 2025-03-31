"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { createReportNotification } from "@/lib/actions/notificationActions";

interface UserInfo {
  id: string;
  email: string;
}

export default function ClaimReportPage({ id, email }: UserInfo) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const itemId = searchParams.get("itemId") as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: "",
    email: "",
  });

  setUserInfo({ id: id, email: email });

  useEffect(() => {
    if (type === "found") {
      setTitle("Claim an Item");
      setDescription(
        "If you've found an item listed on this platform and believe it's yours, please describe your claim below. Include specific identifiers, the item description, or any details that prove ownership."
      );
      setMessage("I believe this item belongs to me. Here are the details...");
    } else if (type === "lost") {
      setTitle("Report a Lost Item");
      setDescription(
        "Use this form to To Report about this lost item. Be as descriptive as possible to help others identify it. Include what the item looks like, where you have last seen it, and any other helpful information."
      );
      setMessage(
        "I lost an item and would like to report it. Here's what happened..."
      );
    }
  }, [type]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!userInfo.id) {
      alert("User not authenticated");
      return;
    }

    const response = await createReportNotification({
      userId: userInfo.id as string,
      type: type || "report",
      message,
      email,
      itemId,
    });

    if (response.success) {
      alert("Request submitted successfully!");
    } else {
      console.error("Error submitting request:", response.error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4 py-10">
      <Card className="w-full max-w-xl bg-zinc-900 border border-zinc-800 text-white shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-3">{title}</h1>
          <p className="text-sm text-zinc-400 mb-6">{description}</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide a clear and detailed description..."
              className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:ring-blue-500"
              rows={5}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                value={userInfo.email}
                placeholder="Your Name"
                readOnly
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Input
                type="email"
                value={userInfo.email}
                placeholder="Your Email"
                readOnly
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
