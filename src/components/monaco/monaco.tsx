"use client";

import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";


export default function MonacoEditor({setValue}: { setValue: (value: string) => void }) {
  const divElement = useRef<HTMLDivElement>(null)
  let editor: monaco.editor.IStandaloneCodeEditor;
  useEffect(() => {
    if (divElement?.current) {
      editor = monaco.editor.create(divElement.current, {
        // value: ["public class Main {",
        //   "\tpublic static void main(String[] args) {",
        //   "\t\tSystem.out.println(\"Hello World!!!\");",
        //   "\t}",
        //   "}\n"].join("\n").replaceAll("\t", "    "),
        language: 'java'

      });
      editor.getModel()?.onDidChangeContent(() => {
        setValue(editor.getModel()?.getValue() ?? "");
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);
  if (typeof window === "undefined") return null;

  return <div style={{
    width: "80%",
    height: "80%",
  }} ref={divElement}/>
}