import { Route, Routes } from "react-router-dom";
import App from "../App";
import { LandingPage } from "../pages/LandingPage";
import { SearchPage } from "../pages/SearchPage";
import { CocktailInfoPage } from "../pages/CocktailInfoPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LandingPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cocktail/:id" element={<CocktailInfoPage />} />
      </Route>
    </Routes>
  );
}
