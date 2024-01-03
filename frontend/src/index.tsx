import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Normalize } from "styled-normalize";
import RouterComponent from "./router"; // Import your RouterComponent

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Normalize />
    <RouterComponent />
  </React.StrictMode>
);

reportWebVitals();
