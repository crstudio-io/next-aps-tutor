"use client";

import MonacoEditor from "@/components/monaco/monaco";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const URL = "http://localhost:8080/problems/"

export default function Solve({ params }: { params: { id: string } }) {
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
  const setValue = (value: any) => {
    setCode(value);
  }
  const onClick = (event: any) => {
    event.target.disabled = true;
    console.log(code);
  }

  return (
    <main>
      <h1>Solve</h1>
      <section>
        {loading ? null : <h2>{title}</h2>}
        <MonacoEditor setValue={setValue} />
        <button
          className="btn bg-primary-subtle"
          onClick={onClick}
        >
          Submit
        </button>
      </section>
    </main>
  );
}