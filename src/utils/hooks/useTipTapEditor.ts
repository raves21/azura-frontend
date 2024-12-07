import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef, useState, useEffect } from "react";
import CharacterCount from "@tiptap/extension-character-count";

type UseTipTapEditorArgs = {
  placeholder?: string;
  maxLength?: number;
};

export function useTipTapEditor(args: UseTipTapEditorArgs) {
  const { placeholder, maxLength } = args;
  const [inputLength, setInputLength] = useState(0);
  const editor = useEditor({
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
      setInputLength(inputText.length);
    },
  });

  const editorContentRef = useRef<HTMLDivElement | null>(null);
  const [editorContentInitialWidth, setEditorContentInitialWidth] = useState(0);

  useEffect(() => {
    if (editorContentRef.current) {
      setEditorContentInitialWidth(
        editorContentRef.current.getBoundingClientRect().width
      );
    }
  }, []);

  return { editor, editorContentRef, editorContentInitialWidth, inputLength };
}
