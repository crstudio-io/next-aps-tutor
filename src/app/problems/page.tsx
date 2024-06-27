import Link from "next/link";
import type { Metadata } from "next";
import ProblemListItem from "@/components/problems/problem";

export const metadata: Metadata = {
  title: "Problems",
};

const URL = "http://localhost:8080/problems"

const getProblems = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function Home() {
  const json = await getProblems();
  const problems = json.content;
  return (
    <main>
      <h1>Problem List</h1>
      {problems.map((elem: {id: number, title: string}) => 
      <Link key={elem.id} href={`/problems/${elem.id}`}>
        <ProblemListItem 
          key={elem.id} 
          id={elem.id} 
          title={elem.title} 
        />
      </Link>)}
    </main>
  );
}
