"use client";

import { ItemForm } from "@/components/ItemForm";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ItemForm />
      </div>
    </div>
  );
}
