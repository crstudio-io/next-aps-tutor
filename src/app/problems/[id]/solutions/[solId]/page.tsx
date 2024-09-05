import CodeMirrorEditor from "@/components/codemirror/codemirror";
import Link from "next/link";
import { Table } from "react-bootstrap";
import SolutionTr from "@/app/problems/[id]/solutions/solution-tr";
import { getProblem } from "@/app/problems/actions";
import { getSolution } from "@/app/problems/[id]/solutions/actions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solution",
};

export default async function Solution({params}: { params: { id: string, solId: string } }) {
  const probId = parseInt(params.id);
  if (isNaN(probId)) notFound();
  const problem = await getProblem(probId);
  if (!problem) notFound();
  const solId = parseInt(params.solId);
  if (isNaN(solId)) notFound();
  const solution = await getSolution(probId, solId);
  if (!solution) notFound();

  metadata.title = `Solution #${solId}`

  return (
    <main className="row justify-content-center">
      <div className="col-md-11 col-lg-9">
        <section className="mb-4 row justify-content-between align-items-baseline">
          <h1 className="col-auto">Problem: {problem.title}</h1>
          <div className="col-auto">
            <Link href={`/problems/${probId}/solutions`}>다른 풀이 보기</Link>
            <span> </span>
            <Link href={`/problems/${probId}`}>문제 보기</Link>
          </div>
        </section>
        <Table className="mb-3" striped hover>
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
        </Table>
        <section>
          <CodeMirrorEditor
            readOnly={true}
            lang={solution.lang}
            value={solution.code}
          />
        </section>
      </div>
    </main>
  )
}