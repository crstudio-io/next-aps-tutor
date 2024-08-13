import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Solution",
};

const getSolution = async (probId: number, solId: number) => {
  const response = await fetch(`http://localhost:8080/problems/${probId}/solutions/${solId}`);
  return await response.json();
};

const getProblem = async (probId: number) => {
  const response = await fetch(`http://localhost:8080/problems/${probId}`);
  return await response.json();
};

export default async function Solution({params}: { params: { id: string, solId: string } }) {
  const probId = parseInt(params.id);
  if (isNaN(probId)) return notFound();
  const solId = parseInt(params.solId);
  if (isNaN(solId)) return notFound();
  const solution = await getSolution(probId, solId);
  const problem = await getProblem(probId);
  console.log(solution);
  console.log(problem);
  return (
    <main className="row justify-content-center">
      <div className="col-md-11 col-lg-9">
        {solution.toString()}
      </div>
    </main>
  )
}