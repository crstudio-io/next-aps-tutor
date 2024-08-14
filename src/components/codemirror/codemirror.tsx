import { basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView, ViewUpdate, keymap } from "@codemirror/view";
import { indentUnit } from "@codemirror/language";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { useCallback, useEffect, useState } from "react";

const setLang = (lang: string) => {
  switch (lang) {
    case "PYTHON3":
      return python();
    default:
      return java();
  }
}

interface CodeMirrorEditorProps {
  readOnly?: boolean,
  onChanged?: (value: string) => void,
  lang: string | null,
  value: string | null,
}

export default function CodeMirrorEditor({readOnly = false, onChanged, lang, value}: CodeMirrorEditorProps) {
  const language = new Compartment;
  const [element, setElement] = useState<HTMLElement>();
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  const updateListener = (view: ViewUpdate) => {
    if (view.docChanged) {
      if (onChanged) onChanged(view.state.doc.text.join("\n"));
    }
  }
  useEffect(() => {
    const theme = EditorView.theme({
      "&": {
        height: "50vh",
      },
      ".cm-content, .cm-gutter": {
        height: "50vh",
      },
      ".cm-scroller": {
        overflow: "auto",
      },
    });
    const state = EditorState.create({
      doc: value,
      // doc: "public class Main {\n    public static void main(String[] args){}\n}",
      extensions: [
        basicSetup,
        language.of(setLang(lang)),
        keymap.of(defaultKeymap),
        keymap.of([indentWithTab]),
        indentUnit.of("    "),
        EditorView.updateListener.of(updateListener),
        theme,
        // EditorState.readOnly.of(readOnly),
        EditorView.editable.of(!readOnly),
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

  return <div ref={ref}></div>;
}
