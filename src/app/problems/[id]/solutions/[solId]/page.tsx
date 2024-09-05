"use client";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CodeMirrorEditor from "@/components/codemirror/codemirror";
import Link from "next/link";
import { Table } from "react-bootstrap";
import SolutionTr from "@/app/problems/[id]/solutions/solution-tr";


export default function Solution({params}: { params: { id: string, solId: string } }) {
  const router = useRouter();
  const probId = parseInt(params.id);
  if (isNaN(probId)) notFound();
  const solId = parseInt(params.solId);
  if (isNaN(solId)) notFound();

  const [solution, setSolution] = useState({
    lang: "", code: "", status: "", score: 0, username: ""
  });
  const [problem, setProblem] = useState({title: null});
  const [fetching, setFetching] = useState(true);

  const getSolution = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) router.push("/signin");
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${jwt}`);

    const response = await fetch(`http://localhost:8080/problems/${probId}/solutions/${solId}`, {
      headers
    });
    setSolution(await response.json());
  };

  const getProblem = async () => {
    const response = await fetch(`http://localhost:8080/problems/${probId}`);
    setProblem(await response.json());
  };
  useEffect(() => {
    getSolution();
    getProblem();
    setFetching(false);
  }, []);

  return (
    <main className="row justify-content-center">
      <div className="col-md-11 col-lg-9">
        {fetching ? <h1>Waiting</h1> : <section className="mb-4 row justify-content-between align-items-baseline">
          <h1 className="col-auto">Problem: {problem.title}</h1>
          <div className="col-auto">
            <Link href={`/problems/${probId}/solutions`}>다른 풀이 보기</Link>
            <span> </span>
            <Link href={`/problems/${probId}`}>문제 보기</Link>
          </div>
        </section>}
        {fetching ? null : <Table className="mb-3" striped hover>
          <thead>
          <tr>
            <th>#id</th>
            <th>User</th>
            <th>Language</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
          </thead>
          <tbody>
          <SolutionTr
            id={solId}
            lang={solution.lang}
            status={solution.status}
            username={solution.username}
            score={solution.score}
            probId={probId}
            isLink={false}
          />
          </tbody>
        </Table>}
        {fetching ? null : <section>
          <CodeMirrorEditor
            readOnly={true}
            lang={solution.lang}
            value={solution.code}
          />
        </section>}
      </div>
    </main>
  )
}