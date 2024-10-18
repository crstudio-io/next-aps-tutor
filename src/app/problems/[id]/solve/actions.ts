"use server";

import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

const HOST = process.env.HOST ?? "http://localhost:8080";

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
  }
  else if (response.status === 403) return redirect(`/api/session/refresh`);
  else {
    console.error(response.status);
    throw Error(`failed with status: ${response.status}`);
  }
}