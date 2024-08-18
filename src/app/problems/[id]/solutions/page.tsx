"use client";

import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Link from "next/link";
import SolutionTr from "@/components/solutions/solution-tr";
import Pagination from "@/components/pagination";

export default function Solutions({params}: { params: { id: string } }) {
  const probId = parseInt(params.id);
  if (isNaN(probId)) notFound();
  const searchParams = useSearchParams();
  const me = searchParams.has("me");
  const page = searchParams.get("page");
  const router = useRouter();

  const [fetching, setFetching] = useState(true);
  const [problem, setProblem] = useState({id: null, title: null});
  const [pageInfo, setPageInfo] = useState({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [content, setContent] = useState([]);

  const getProblem = async () => {
    const URL = `http://localhost:8080/problems/${probId}`;
    const response = await fetch(URL);
    const json = await response.json();
    setProblem(json);
  }
  const getSolution = async () => {
    const URL = `http://localhost:8080/problems/${probId}/solutions${(me ? "/me" : "") + (page ? `?page=${page}` : "")}`;
    const jwt = localStorage.getItem("jwt");
    if (!jwt) router.push("/signin");
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${jwt}`);
    const response = await fetch(URL, {
      headers
    });
    if (response.ok) {
      const json = await response.json();
      setContent(json.content);
      setPageInfo(json.page);
    }
  }

  useEffect(() => {
    getProblem();
    getSolution();
    setFetching(false);
  }, [me, page]);

  return (
    <main className="row justify-content-center">
      <div className="col-md-11 col-lg-9">
        {fetching ? <h1>Waiting</h1> : null}
        {fetching ? null : <section className="mb-4 row justify-content-between align-items-baseline">
          <h1 className="col-auto">Solutions: {problem.title}</h1>
          <div className="col-auto">
            {me ?
              <Link href={`/problems/${probId}/solutions`}>다른 풀이 보기</Link> :
              <Link href={`/problems/${probId}/solutions?me`}>내 풀이 보기</Link>
            }
            <span> </span>
            <Link href={`/problems/${probId}`}>문제보기</Link>
          </div>
        </section>}
        {fetching ? null : <Table striped hover>
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
        </Table>}
        {fetching ? null : <Pagination pageInfo={pageInfo} />}
      </div>
    </main>
  )
}
