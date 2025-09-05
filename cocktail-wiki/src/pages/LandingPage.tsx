import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import { mapRawCocktailData } from "../mapRawCocktailData";
import { Link } from "react-router-dom";
import "../LandingPage.css";
import type { ICocktail } from "../util/Types";

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
      <article key={ctail.id} className="cocktail-card">
        <h2>{ctail.name}</h2>
        <img src={ctail.thumbnail} alt={ctail.name} />
        <div>
          <Link to={`/cocktail/${ctail.id}`}>
            <button>See more</button>
          </Link>
        </div>
      </article>
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
      <section>{renderDrink()}</section>
      <button className="random-button" onClick={loadRandomDrink}>
        Hämta ny cocktail
      </button>
    </main>
  );
}
