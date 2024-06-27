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

export default async function ProblemDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();
  metadata.title = "Problem " + id;
  const problem = await getProblem(id);
  const examples = problem.examples;
  return (
    <div>
      <h1>Problem</h1>
      <section>
        <Link href={`/problems/${id}/solve`}>제출하기</Link>
        <h1>{problem.title}</h1>
        <p>{problem.probDesc}</p>
      </section>
      <section>
        <h2>입력</h2>
        <p>{problem.inputDesc}</p>
      </section>
      <section>
        <h2>출력</h2>
        <p>{problem.outputDesc}</p>
      </section>
      <section>
        {examples.map((elem: { id: string, inputExample: string, outputExample: string }) => <div key={elem.id}>
          <div>
            <h3>입력</h3>
            <p>{elem.inputExample}</p>
          </div>
          <div>
            <h3>출력</h3>
            <p>{elem.outputExample}</p>
          </div>
        </div>)}
      </section>
    </div>
  );
}