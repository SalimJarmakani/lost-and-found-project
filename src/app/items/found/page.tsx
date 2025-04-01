"use server";
import ClaimReportPage from "@/components/ClaimReport";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import UserModel, { User } from "@/lib/types/User";

export default async function Page() {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);
  console.log(session);
  const user = (await UserModel.findById(session?.userId)) as User;
  const email: string = session!.email as string;

  const userInfo = {
    id: session?.userId as string,
    email: email,
    name: user.name,
  };
  return (
    <>
      <ClaimReportPage {...userInfo} />
    </>
  );
}
