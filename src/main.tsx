import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router";
import "./index.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);
