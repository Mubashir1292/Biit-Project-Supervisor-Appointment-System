import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
const area = document.getElementById("root");
const root = createRoot(area);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
