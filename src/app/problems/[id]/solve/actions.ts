"use server";

import { getSession, removeSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const HOST = "http://localhost:8080";

export async function submit(probId: number, lang: string, code: string) {
  const session = await getSession();
  const signedIn = session.signedIn;
  if (!signedIn) return redirect("/signin");
  const jwt = session.jwt;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);
  headers.append("Content-Type", "application/json");
  const url = `${HOST}/problems/${probId}/solutions`;
  const response = await fetch(url, {
    method: "post",
    headers,
    body: JSON.stringify({lang, code}),
  });
  if (response.ok) {
    revalidatePath(`/problems/${probId}/solutions`);
    return redirect(`/problems/${probId}/solutions?me`);
  } else {
    await removeSession();
    return redirect("/signin");
  }
}