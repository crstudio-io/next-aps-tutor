"use client";

import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { java } from "@codemirror/lang-java";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { useCallback, useEffect, useState } from "react";

export default function CodeMirrorEditor({ onChanged }: { onChanged: (value: any) => void }) {
  const [element, setElement] = useState<HTMLElement>();
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);
  const startState = EditorState.create({
    // doc: "public class Main {\n    public static void main(String[] args){}\n}",
    extensions: [
      basicSetup,
      java(),
      keymap.of(defaultKeymap),
      keymap.of([indentWithTab]),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          onChanged(v.state.doc.text.join("\n"));
        }
      }),
    ],
  });

  const onClick = () => {
    console.log(startState.doc)
  }

  useEffect(() => {
    const view = new EditorView({
      state: startState,
      parent: element,
    });
    return () => {
      view?.destroy();
    }
  }, [element]);

  return <div>
    <div ref={ref}></div>
  </div>;
}
