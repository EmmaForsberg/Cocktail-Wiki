import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { mapRawCocktailData } from "../mapRawCocktailData";
import type { ICocktail } from "../util/Types";
import { CocktailCard } from "./CocktailCard";

export function LandingPage(): ReactElement {
  const [cocktail, setCocktail] = useState<ICocktail[]>([]);

  //funktion som hämtar en random drink från apiet
  const fetchRandomDrink = async (count: number): Promise<ICocktail[]> => {
    if (count <= 0) return [];

    const res = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data: { drinks: any[] } = await res.json();

    return data.drinks.map(mapRawCocktailData).slice(0, count);
  };

  //funktion som parar ihop drinknamn och bild. Denna anropar jag sedan i min return
  const renderDrink = (): ReactNode => {
    return cocktail.map((ctail) => (
      <CocktailCard key={ctail.id} cocktail={ctail} />
    ));
  };

  // useeffect körs bara en gång när sidan ladda
  useEffect(() => {
    fetchRandomDrink(1).then((drinks) => {
      setCocktail(drinks);
    });
  }, []);

  //skapa en ladda om funktion som anroopar fetchrandomdrink(1) och uppdaterar state
  const loadRandomDrink = async () => {
    const drinks = await fetchRandomDrink(1);
    setCocktail(drinks);
  };

  return (
    <main>
      <section className="cards-container">
        {renderDrink()}
        <div className="button-wrapper">
          <button className="button" onClick={loadRandomDrink}>
            Fetch a new cocktail
          </button>
        </div>
      </section>
    </main>
  );
}
