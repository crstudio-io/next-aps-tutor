import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ClipboardButton from "@/components/problems/clipboard-btn";

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
        <section className="mb-4 row justify-content-between align-items-baseline">
          <h1 className="col-auto">Problem: {problem.title}</h1>
          <div className="col-auto">
            <Link href={`/problems/${id}/solutions`}>풀이 보기</Link>
            <span> </span>
            <Link href={`/problems/${id}/solve`}>제출하기</Link>
          </div>
        </section>
        <section className="mb-3">
          <p>{problem.probDesc}</p>
        </section>
        <section className="mb-3">
          <h2 className="fs-3">입력</h2>
          <p>{problem.inputDesc}</p>
        </section>
        <section className="mb-3">
          <h2 className="fs-3">출력</h2>
          <p>{problem.outputDesc}</p>
        </section>
        <section className="mb-3">
          {examples.map((elem: { id: string, inputExample: string, outputExample: string }, index: number) =>
            <div key={elem.id} className="row mb-2">
              <div className="col-12 col-md-6">
                <h3 className="fs-4">입력 예시 {index + 1}</h3>
                <div className="position-relative">
                  <div className="w-100 d-flex justify-content-end position-absolute top-0 p-1">
                    <ClipboardButton value={elem.inputExample}></ClipboardButton>
                  </div>
                  <pre className="bg-info-subtle rounded p-2 fs-6">{elem.inputExample}</pre>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <h3 className="fs-4">출력 예시 {index + 1}</h3>
                <div className="position-relative">
                  <div className="w-100 d-flex justify-content-end position-absolute top-0 p-1">
                    <ClipboardButton value={elem.outputExample}></ClipboardButton>
                  </div>
                  <pre className="bg-info-subtle rounded p-2 fs-6">{elem.outputExample}</pre>
                </div>
              </div>
            </div>)}
        </section>
      </div>
    </main>
  );
}