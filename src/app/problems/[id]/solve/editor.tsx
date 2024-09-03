"use client";
import { useState } from "react";
import CodeMirrorEditor from "@/components/codemirror/codemirror";
import { submit } from "@/app/problems/[id]/solve/actions";

export default function Editor({probId}: { probId: number }) {
  const [lang, setLang] = useState("JAVA17");
  const onChangeLang = (event: { target: { value: string; }; }) => {
    setLang(event.target.value);
  }

  const [code, setCode] = useState("");
  const onChanged = (code: string) => {
    setCode(code);
  }

  const onClick = () => submit.bind(null, probId, lang, code)();

  return <section>
    <div className="mb-3 row">
      <div className="col-4">
        <label htmlFor="lang-select" className="form-label">Language</label>
        <select id="lang-select" defaultValue="JAVA17" onChange={onChangeLang} className="form-select">
          <option value="JAVA17">Java</option>
          <option value="PYTHON3">Python 3</option>
        </select>
      </div>
    </div>
    <div>
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
    </div>
  </section>;
}
