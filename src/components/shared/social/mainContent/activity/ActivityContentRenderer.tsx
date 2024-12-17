import { ReactNode, useNavigate } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export default function ActivityContentRenderer({
  content,
}: {
  content: string;
}) {
  const navigate = useNavigate();
  return (
    <>
      {content.split(/(\s+)/).map((word, index) => {
        if (/mention/g.test(word)) {
          return (
            <button
              key={`button-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                navigate({
                  to: "/social/$userName",
                  params: {
                    userName: "geromepenalosa",
                  },
                });
              }}
              className="text-blue-500 hover:underline underline-offset-2 decoration-blue-500"
            >
              @geromepenalosa
            </button>
          );
        }
        if (/\n/g.test(word)) {
          const toBeRendered: ReactNode[] = [];
          word.split("").map((char) => {
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
        return <Fragment key={`word-${index}`}>{word}</Fragment>;
      })}
    </>
  );
}
