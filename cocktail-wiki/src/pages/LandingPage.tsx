import { useEffect, useState, type ReactElement, type ReactNode } from "react";

interface ICocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

type CocktailResponse = {
  drinks: ICocktail[];
};

export function LandingPage(): ReactElement {
  const [cocktail, setCocktail] = useState<ICocktail[]>([]);

  const fetchRandomDrink = async (count: number): Promise<ICocktail[]> => {
    if (count <= 0) return [];

    const res = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data: CocktailResponse = await res.json();

    return data.drinks?.slice(0, count);
  };

  const renderDrink = (): ReactNode => {
    return cocktail.map((ctail) => (
      <article key={ctail.idDrink}>
        <h2>{ctail.strDrink}</h2>
        <img src={ctail.strDrinkThumb}/>
      </article>
    ));
  };

  useEffect(() => {
    fetchRandomDrink(1).then((drinks) => {
      setCocktail(drinks);
    });
  }, []);

  return (
    <main>
      <h1>Emmas drink</h1>

      <section>{renderDrink()}</section>
    </main>
  );
}
