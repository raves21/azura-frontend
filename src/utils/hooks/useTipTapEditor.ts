import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef, useState, useEffect } from "react";
import CharacterCount from "@tiptap/extension-character-count";
import { EditorProps } from "@tiptap/pm/view";

type UseTipTapEditorArgs = {
  placeholder?: string;
  maxLength?: number;
  editorProps?: EditorProps;
  focusOnMount: boolean;
};

export function useTipTapEditor({
  placeholder,
  maxLength,
  editorProps,
  focusOnMount,
}: UseTipTapEditorArgs) {
  const [inputLength, setInputLength] = useState(0);
  const [inputText, setInputText] = useState("");
  const editor = useEditor({
    editorProps: { ...editorProps },
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount.configure({
        limit: maxLength,
      }),
    ],
    onUpdate: ({ editor }) => {
      const inputText = editor.getText({ blockSeparator: "\n" });
      setInputText(inputText);
      setInputLength(inputText.length);
    },
  });

  const editorContentRef = useRef<HTMLDivElement | null>(null);
  const [editorContentInitialWidth, setEditorContentInitialWidth] = useState(0);
  const [editorContentInitialHeight, setEditorContentInitialHeight] =
    useState(0);

  useEffect(() => {
    if (editor && focusOnMount) {
      editor.commands.focus();
    }
    if (editorContentRef.current) {
      setEditorContentInitialWidth(
        editorContentRef.current.getBoundingClientRect().width
      );
      setEditorContentInitialHeight(
        editorContentRef.current.getBoundingClientRect().height
      );
    }
  }, []);

  function clearInputText() {
    if (editor) {
      editor.commands.clearContent();
      setInputLength(0);
      setInputText("");
    }
  }

  return {
    editor,
    editorContentRef,
    editorContentInitialWidth,
    editorContentInitialHeight,
    inputLength,
    inputText,
    clearInputText,
  };
}
