"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const HOST = process.env.HOST ?? "http://localhost:8080";

export async function getSolutions(probId: number, me: boolean, page: string | null) {
  const session = await getSession();
  const {jwt, signedIn} = session;
  if (!signedIn) return redirect("/signin");
  const url = `${HOST}/problems/${probId}/solutions${(me ? "/me" : "") + (page ? `?page=${page}` : "")}`;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);
  const response = await fetch(url, { headers });
  if (response.ok) return await response.json();
  else if (response.status === 403) redirect(`/api/session/refresh`);
  else {
    console.error(response.status);
    throw Error(`failed with status: ${response.status}`);
  }
}

export async function getSolution(probId: number, solId: number) {
  const session = await getSession();
  const {jwt, signedIn} = session;
  if (!signedIn) return redirect("/signin");
  const url = `${HOST}/problems/${probId}/solutions/${solId}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${jwt}`);

  const response = await fetch(url, { headers });
  if (response.ok) return await response.json();
  else if (response.status === 403) return redirect(`/api/session/refresh`);
  else {
    console.error(response.status);
    throw Error(`failed with status: ${response.status}`);
  }
}
