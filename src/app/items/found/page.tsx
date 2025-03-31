"use server";
import ClaimReportPage from "@/components/ClaimReport";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export default async function Page() {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);
  const email: string = session!.email as string;

  const userInfo = {
    id: session?.userId as string,
    email: email,
  };
  return (
    <>
      <ClaimReportPage {...userInfo} />
    </>
  );
}
