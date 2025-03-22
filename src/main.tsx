// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //see useDebounceOnClick.tsx to see why strictmode is disabled
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);
