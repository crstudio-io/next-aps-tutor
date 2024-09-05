import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import Editor from "@/app/problems/[id]/solve/editor";
import type { Metadata } from "next";
import { getProblem } from "@/app/problems/actions";

export const metadata: Metadata = {
  title: "Solve",
};

export default async function Solve({params}: { params: { id: string } }) {
  metadata.title = `Solve #${params.id}`;
  const session = await getSession();
  if (!session.signedIn) redirect("/signin");
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();
  const problem = await getProblem(id);
  if (!problem) notFound();

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
