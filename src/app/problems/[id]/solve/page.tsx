"use client";

import CodeMirrorEditor from "@/components/codemirror/codemirror";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const URL = "http://localhost:8080/problems/"

export default function Solve({params}: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const getProblem = async () => {
    const response = await fetch(URL + id);
    const json = await response.json();
    setTitle(json.title);
    setLoading(false);
  }
  useEffect(() => {
    getProblem();
  }, [])

  const [code, setCode] = useState("");
  const onChanged = (value: any) => {
    setCode(value);
  }
  const onClick = (event: any) => {
    event.target.disabled = true;
    console.log(code);
  }

  const [lang, setLang] = useState("java");
  const onChangeLang = (event: { target: { value: any; }; }) => {
    setLang(event.target.value);
  }

  return (
    <main className="row justify-content-center">
      <div className="col-sm-11 col-md-10 col-lg-8">
        {loading ? <h1>Loading...</h1> : <h1 className="mb-3">Solve: {title}</h1>}
        {loading ? null : <section className="mb-3 row">
          <div className="col-4">
            <label htmlFor="lang-select" className="form-label">Language</label>
            <select id="lang-select" defaultValue="java" onChange={onChangeLang} className="form-select">
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
          </div>
        </section>}
        {loading ? null : <section>
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