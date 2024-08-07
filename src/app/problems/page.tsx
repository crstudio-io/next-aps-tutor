import type { Metadata } from "next";
import { Table } from "react-bootstrap";
import ProblemTr from "@/components/problems/problem-tr";

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
    <main className="row justify-content-center">
      <div className="col-md-11 col-lg-9">
        <h1>Problem List</h1>
        <Table striped hover>
          <thead>
          <tr>
            <th>#id</th>
            <th>Title</th>
          </tr>
          </thead>
          <tbody>
          {problems.map((elem: { id: number, title: string }) =>
            <ProblemTr
              key={elem.id}
              id={elem.id}
              title={elem.title}
            />)}
          </tbody>
        </Table>
      </div>
    </main>
  );
}
