import { getSession, removeSession } from "@/lib/session";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await getSession();
  return Response.json(session);
}

export async function DELETE(request: NextRequest) {
  await removeSession();
  const url = request.nextUrl.clone();
  url.pathname = "/";
  revalidatePath("/", "layout");
  // return Response.redirect(url, 303);
  return new Response(null, {status: 204});
}
