"use client";

import { basicSetup } from "codemirror";
import { EditorState, Compartment, Text } from "@codemirror/state";
import { EditorView, ViewUpdate, keymap } from "@codemirror/view";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { useCallback, useEffect, useState } from "react";

const setLang = (lang: string) => {
  switch (lang) {
    case "python":
      return python();
    default:
      return java();
  }
}

export default function CodeMirrorEditor({ onChanged, lang, value }: { onChanged: (value: any) => void, lang: string, value: string }) {
  const language = new Compartment;
  const [element, setElement] = useState<HTMLElement>();
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);
  
  const updateListener = (view: ViewUpdate) => {
    if (view.docChanged) {
      console.log(view.state.doc);
      onChanged(view.state.doc.text.join("\n"));
    }
  }
  useEffect(() => {
    let state = EditorState.create({
      doc: value,
      // doc: "public class Main {\n    public static void main(String[] args){}\n}",
      extensions: [
        basicSetup,
        language.of(setLang(lang)),
        keymap.of(defaultKeymap),
        keymap.of([indentWithTab]),
        EditorView.updateListener.of(updateListener),
      ],
    });

    const view = new EditorView({
      state: state,
      parent: element,
    });

    return () => {
      view?.destroy();
    }
  }, [element, lang]);

  return <div>
    <div ref={ref}></div>
  </div>;
}
