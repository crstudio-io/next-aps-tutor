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
    <main>
      <h1>Solve</h1>
      {loading ? <h1>Loading...</h1> : null}
      {loading ? null : <select defaultValue="java" onChange={onChangeLang}>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>}
      {loading ? null : <section>
        <h2>{title}</h2>
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
    </main>
  );
}