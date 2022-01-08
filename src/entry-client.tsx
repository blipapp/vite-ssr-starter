import { createRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
