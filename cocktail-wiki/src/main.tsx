import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./index.css";
import { AppRouter } from "./util/AppRouter";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <AppRouter/>
  </BrowserRouter>
);
