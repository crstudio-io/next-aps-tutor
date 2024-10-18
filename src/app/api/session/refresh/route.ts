import { setUserInfo } from "@/app/signin/verify/actions";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { ironSession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const next = searchParams.get("next") ?? "/";
  const session = await ironSession();
  if (!session.jwt) return redirect("/signin");
  await setUserInfo(session.jwt);
  return redirect(next);
}
