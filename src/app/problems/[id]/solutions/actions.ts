"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const HOST = "http://localhost:8080";

export async function getSolutions(probId: number, me: boolean, page: string | null) {
  const session = await getSession();
  const {jwt, signedIn} = session;
  if (!signedIn) return redirect("/signin");
  const url = `${HOST}/problems/${probId}/solutions${(me ? "/me" : "") + (page ? `?page=${page}` : "")}`;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);
  const response = await fetch(url, {
    headers
  });
  if (response.ok) return await response.json();
}

export async function getSolution(probId: number, solId: number) {
  const session = await getSession();
  const {jwt, signedIn} = session;
  if (!signedIn) return redirect("/signin");
  const url = `${HOST}/problems/${probId}/solutions/${solId}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${jwt}`);

  const response = await fetch(url, {
    headers
  });
  if (response.ok) return await response.json();
}