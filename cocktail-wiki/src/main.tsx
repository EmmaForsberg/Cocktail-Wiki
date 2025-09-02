import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { SearchPage } from "./pages/SearchPage.tsx";
import { CocktailInfoPage } from "./pages/CocktailInfoPage.tsx";
import { LandingPage } from "./pages/LandingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} /> {/* "/" */}
      <Route path="search" element={<SearchPage />} /> {/* "/search" */}
      <Route path="cocktail/:id" element={<CocktailInfoPage />} />{" "}
      {/* "/cocktail/123" */}
      </Route>
    </Routes>
  </BrowserRouter>
);
