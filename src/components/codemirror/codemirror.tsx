"use client";

import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
// import "codemirror/lib/codemirror.css";
import { useCallback, useEffect, useRef, useState } from "react";


export default function CodeMirrorEditor() {
  const [element, setElement] = useState<HTMLElement>();
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);
  useEffect(() => {
    const startState = EditorState.create({
      doc: "Hello World",
      extensions: [keymap.of(defaultKeymap)],
    })
    const view = new EditorView({
      state: startState,
      parent: element,
    });
  }, [element]);
  return <div ref={ref}></div>;
}
