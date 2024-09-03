import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import Editor from "@/app/problems/[id]/solve/editor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solve",
};

const URL = "http://localhost:8080/problems/"

const getProblem = async (id: number): Promise<{ title: string }> => {
  const response = await fetch(URL + id);
  return await response.json();
}

export default async function Solve({params}: { params: { id: string } }) {
  const session = await getSession();
  if (!session.signedIn) redirect("/signin");
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();
  const problem = await getProblem(id);
  metadata.title = problem.title;

  return (
    <main className="row justify-content-center">
      <div className="col-sm-11 col-md-10 col-lg-8">
        <div className="mb-4 row align-items-baseline justify-content-between">
          <h1 className="col-auto">Solve: {problem.title}</h1>
          <Link href={`/problems/${id}`} className="col-auto">돌아가기</Link>
        </div>
        <Editor probId={id}/>
      </div>
    </main>
  );
}
