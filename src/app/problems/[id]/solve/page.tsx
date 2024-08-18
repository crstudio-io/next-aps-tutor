"use client";

import CodeMirrorEditor from "@/components/codemirror/codemirror";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const URL = "http://localhost:8080/problems/"

export default function Solve({params}: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();
  const router = useRouter();
  const [fetching, setFetching] = useState(true);
  const [title, setTitle] = useState("");

  const getUserInfo = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) router.push("/signin");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
    const response = await fetch("http://localhost:8080/auth/user-info", {
      headers
    });
    if (!response.ok) {
      localStorage.removeItem("jwt");
      router.push("/signin");
    }
  }

  const getProblem = async () => {
    const response = await fetch(URL + id);
    const json = await response.json();
    setTitle(json.title);
  }
  useEffect(() => {
    getProblem();
    getUserInfo();
    setFetching(false);
  })

  const [code, setCode] = useState("");
  const onChanged = (value: any) => {
    setCode(value);
  }
  const onClick = async (event: any) => {
    event.target.disabled = true;
    const body = JSON.stringify({
      lang, code,
    });
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
    headers.append("Content-Type", "application/json");
    const response = await fetch(URL + `${id}/solutions`, {
      method: "post",
      headers,
      body,
    });
    if (response.ok)
      router.push("solutions?me")
    else alert(response.status);
  }

  const [lang, setLang] = useState("JAVA17");
  const onChangeLang = (event: { target: { value: any; }; }) => {
    setLang(event.target.value);
  }

  return (
    <main className="row justify-content-center">
      <div className="col-sm-11 col-md-10 col-lg-8">
        {fetching ? <h1>Loading...</h1> : <div className="mb-4 row align-items-baseline justify-content-between">
          <h1 className="col-auto">Solve: {title}</h1>
          <Link href={`/problems/${id}`} className="col-auto">돌아가기</Link>
        </div>}
        {fetching ? null : <section className="mb-3 row">
          <div className="col-4">
            <label htmlFor="lang-select" className="form-label">Language</label>
            <select id="lang-select" defaultValue="JAVA17" onChange={onChangeLang} className="form-select">
              <option value="JAVA17">Java</option>
              <option value="PYTHON3">Python 3</option>
            </select>
          </div>
        </section>}
        {fetching ? null : <section>
          <CodeMirrorEditor
            onChanged={onChanged}
            lang={lang}
            value={code}
          />
          <button
            style={{
              marginTop: "12px"
            }}
            className="btn bg-primary-subtle"
            onClick={onClick}
          >
            Submit
          </button>
        </section>}
      </div>
    </main>
  );
}