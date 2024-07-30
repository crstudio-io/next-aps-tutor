import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Problem",
};

const URL = "http://localhost:8080/problems/"
const getProblem = async (id: number) => {
  const response = await fetch(URL + id);
  return await response.json();
}

export default async function ProblemDetail({params}: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();
  metadata.title = "Problem " + id;
  const problem = await getProblem(id);
  const examples = problem.examples;
  return (
    <main className="row justify-content-center">
      <div className="col-sm-11 col-md-10 col-lg-8">
        <section className="mb-4 row justify-content-between">
          <h1 className="col-auto">Problem: {problem.title}</h1>
          <Link href={`/problems/${id}/solve`} className="col-auto">제출하기</Link>
        </section>
        <section className="mb-3">
          <p>{problem.probDesc}</p>
        </section>
        <section className="mb-3">
          <h2>입력</h2>
          <p>{problem.inputDesc}</p>
        </section>
        <section className="mb-3">
          <h2>출력</h2>
          <p>{problem.outputDesc}</p>
        </section>
        <section className="mb-3">
          {examples.map((elem: { id: string, inputExample: string, outputExample: string }, index: number) =>
            <div key={elem.id} className="row mb-2">
              <div className="col-12 col-md-6">
                <h3 className="mb-1">입력 예시 {index + 1}</h3>
                <pre>{elem.inputExample}</pre>
              </div>
              <div className="col-12 col-md-6">
                <h3 className="mb-1">출력 예시 {index + 1}</h3>
                <pre>{elem.outputExample}</pre>
              </div>
            </div>)}
        </section>
      </div>
    </main>
  );
}