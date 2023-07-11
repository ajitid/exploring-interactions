import React from "react";
import ReactDOM from "react-dom/client";

import "./fonts.css";
import "./index.css";

import { App } from "./pages/app.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
