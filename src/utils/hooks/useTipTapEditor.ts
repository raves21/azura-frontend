import { AnyExtension, Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef, useState, useEffect } from "react";
import CharacterCount from "@tiptap/extension-character-count";
import { EditorProps } from "@tiptap/pm/view";

export type UseTipTapEditorReturnType = {
  editor: Editor | null;
  editorContentRef: React.MutableRefObject<HTMLDivElement | null>;
  editorContentInitialWidth: number;
  editorContentInitialHeight: number;
  inputLength: number;
  inputText: string | null;
  setInputText: React.Dispatch<React.SetStateAction<string | null>>;
  setEditorContent: (text: string | null) => void;
  clearEditorContent: () => void;
};

type Args = {
  placeholder?: string;
  maxLength?: number;
  editorProps?: EditorProps;
  noNewLine?: boolean;
  customExtensions?: AnyExtension[];
  focusOnMount: boolean;
};

export function useTipTapEditor({
  placeholder,
  maxLength,
  editorProps,
  customExtensions = [],
  focusOnMount,
}: Args): UseTipTapEditorReturnType {
  const [inputLength, setInputLength] = useState(0);
  const [inputText, setInputText] = useState<string | null>(null);

  const editor = useEditor({
    editorProps: { ...editorProps },
    parseOptions: {
      preserveWhitespace: "full",
    },
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
      ...customExtensions,
    ],
    onUpdate: ({ editor }) => {
      const text = editor.getText({ blockSeparator: "\n" });
      setInputText(text);
      setInputLength(text.length);
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
  }, [editor, focusOnMount]);

  function setEditorContent(text: string | null) {
    if (editor) {
      editor.commands.setContent(text, false, {
        preserveWhitespace: "full",
      });
      setInputText(text);
    }
  }

  function clearEditorContent() {
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
    setInputText,
    setEditorContent,
    clearEditorContent,
  };
}
