import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

export const DisableNewLine = Extension.create({
  name: "no_new_line",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        props: {
          handleKeyDown: (_, event) => {
            if (event.key === "Enter") {
              return true;
            }
          }
        }
      })
    ];
  }
});
