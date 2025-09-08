import { useEffect, useState, type ReactElement } from "react";
import { useParams } from "react-router-dom";
import type { ICocktail } from "../util/Types";
import { mapRawCocktailData } from "../mapRawCocktailData";

//Lookup full cocktail details by id
//www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

//category
//image
//tags
//ingredients & measurements
//proper glass to serve in

export function CocktailInfoPage(): ReactElement {
  const [cocktail, setCocktail] = useState<ICocktail | null>(null);

  //useparams för att hämta id från url
  const { id } = useParams<{ id: string }>();

  //funktion som hämtar apiet
  const fetchCocktailById = async (id: string): Promise<ICocktail> => {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data: { drinks: any[] } = await res.json();
    return mapRawCocktailData(data.drinks[0]); // vi tar bara första
  };

  useEffect(() => {
    if (!id) return; // inget id = ingen fetch
    fetchCocktailById(id).then((drink) => setCocktail(drink));
  }, [id]);

  return (
    <>
      <main>
        <h1>{cocktail?.name}</h1>
        <p>{cocktail?.category}</p>
        <img src={cocktail?.thumbnail} />
        <p>{cocktail?.tags}</p>
        <h3>Ingredienser:</h3>
        <ul>
          {cocktail?.ingredients.map((ing) => (
            <li key={ing.ingredient}>
              {ing.measure ?? ""} {ing.ingredient}
            </li>
          ))}
        </ul>
        <p>{cocktail?.glass}</p>
        <p>{cocktail?.instructions}</p>
      </main>
    </>
  );
}
