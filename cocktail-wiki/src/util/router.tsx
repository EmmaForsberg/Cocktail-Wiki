import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../components/App";
import { LandingPage } from "../components/LandingPage";
import { SearchPage } from "../components/SearchPage";
import { CocktailInfoPage } from "../components/CocktailInfoPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
       <Route index element={<LandingPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cocktail/:id" element={<CocktailInfoPage />} />
    </Route>
  )
);