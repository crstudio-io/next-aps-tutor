import { notFound } from "next/navigation";
import { getProblem } from "@/app/problems/actions";
import Link from "next/link";
import { getSolutions } from "@/app/problems/[id]/solutions/actions";
import { Table } from "react-bootstrap";
import SolutionTr from "@/app/problems/[id]/solutions/solution-tr";
import Pagination from "@/components/pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
};

export const dynamic = "force-dynamic";

export default async function Solutions({params, searchParams,}: {
  params: { id: string },
  searchParams: { [key: string]: string | undefined }
}) {
  metadata.title = `Solutions for #${params.id}`;

  const probId = parseInt(params.id);
  if (isNaN(probId)) notFound();
  const problem = await getProblem(probId);
  if (!problem) notFound();

  const me = searchParams?.me === "";
  const pageParam = searchParams?.page ?? null;
  const solutions = await getSolutions(probId, me, pageParam);
  const {content, page} = solutions;
  return (
    <main className="row justify-content-center">
      <div className="col-md-11 col-lg-9">
        <section className="mb-4 row justify-content-between align-items-baseline">
          <h1 className="col-auto">Solutions: {problem.title}</h1>
          <div className="col-auto">
            {me ?
              <Link href={`/problems/${probId}/solutions`}>다른 풀이 보기</Link> :
              <Link href={`/problems/${probId}/solutions?me`}>내 풀이 보기</Link>
            }
            <span> </span>
            <Link href={`/problems/${probId}`}>문제보기</Link>
          </div>
        </section>
        <Table striped hover>
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
          {content.map((elem: {
            id: number,
            username: string,
            lang: string,
            status: string,
            score: number,
          }) => <SolutionTr
            key={elem.id}
            id={elem.id}
            username={elem.username}
            lang={elem.lang}
            score={elem.score}
            status={elem.status}
            probId={probId}
            isLink={true}
          />)}
          </tbody>
        </Table>
        <Pagination page={page}/>
      </div>
    </main>
  )
}
