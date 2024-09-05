"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const HOST = "http://localhost:8080";

export async function getSolutions(probId: number, me: boolean, page: string | null) {
  const session = await getSession();
  const signedIn = session.signedIn;
  if (!signedIn) return redirect("/signin");

  const URL = `${HOST}/problems/${probId}/solutions${(me ? "/me" : "") + (page ? `?page=${page}` : "")}`;
  const jwt = session.jwt;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);
  const response = await fetch(URL, {
    headers
  });
  if (response.ok) return await response.json();
}
