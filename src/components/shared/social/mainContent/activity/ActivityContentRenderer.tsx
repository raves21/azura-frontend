import { ReactNode, useNavigate } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export default function ActivityContentRenderer({
  content,
}: {
  content: string;
}) {
  const navigate = useNavigate();
  const tokens = content.split(/(\s+)/);
  const hashtagRegex = /#\w+/g;
  const mentionRegex = /mention/g;
  const newlineRegex = /\n/g;

  return (
    <>
      {tokens.map((token, index) => {
        if (hashtagRegex.test(token)) {
          return (
            <button
              key={`hashtag-${index}`}
              className="text-blue-500 hover:underline underline-offset-2 decoration-blue-500"
            >
              {token}
            </button>
          );
        }
        if (mentionRegex.test(token)) {
          return (
            <button
              key={`mention-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                navigate({
                  to: "/social/$userHandle",
                  params: {
                    userHandle: "geromepenalosa",
                  },
                });
              }}
              className="text-blue-500 hover:underline underline-offset-2 decoration-blue-500"
            >
              @geromepenalosa
            </button>
          );
        }
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
