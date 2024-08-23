import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { setUserInfo, verifySignIn } from "@/app/signin/verify/actions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jwt = await verifySignIn(searchParams.get("token") ?? "");
  await setUserInfo(jwt);
  redirect("/");
}