"use server";

const URL = "http://localhost:8080/problems"

interface Problem {
  title: string;
  examples: Array<any>;
  probDesc: string;
  inputDesc: string;
  outputDesc: string;
}

export const getProblems = async () => {
  const response = await fetch(URL);
  return await response.json();
};


export const getProblem = async (probId: number): Promise<Problem | null> => {
  const response = await fetch(`${URL}/${probId}`);
  if (!response.ok) return null;
  return await response.json();
}