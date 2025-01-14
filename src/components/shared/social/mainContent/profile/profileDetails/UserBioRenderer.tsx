import { ReactNode } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export default function UserBioRenderer({ content }: { content: string }) {
  const tokens = content.split(/(\s+)/);
  const newlineRegex = /\n/g;

  return (
    <>
      {tokens.map((token, index) => {
        if (newlineRegex.test(token)) {
          const toBeRendered: ReactNode[] = [];
          token.split("").map((char) => {
            if (char === "\n") {
              toBeRendered.push(<br />);
            } else {
              toBeRendered.push(<span>&nbsp;</span>);
            }
          });
          return toBeRendered.map((element, elIndex) => (
            <Fragment key={`element-${index}-${elIndex}`}>{element}</Fragment>
          ));
        }
        return <Fragment key={`word-${index}`}>{token}</Fragment>;
      })}
    </>
  );
}
