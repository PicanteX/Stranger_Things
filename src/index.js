import React from "react";
import { Main } from "./components";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(
  document.getElementById("root"),
)
.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);

reportWebVitals();