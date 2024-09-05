"use server";

import { notFound } from "next/navigation";

const URL = "http://localhost:8080/problems"

interface Problem {
  id: number;
  title: string;
  examples: Array<Example>;
  probDesc: string;
  inputDesc: string;
  outputDesc: string;
}

interface Example {
  id: string;
  inputExample: string;
  outputExample: string;
}

export const getProblems = async () => {
  const response = await fetch(URL);
  return await response.json();
};


export const getProblem = async (probId: number): Promise<Problem | null> => {
  const response = await fetch(`${URL}/${probId}`);
  if (!response.ok) return notFound();
  return await response.json();
}