import { useState, type ReactElement } from "react";
import type { ICocktail } from "../util/Types";
import { mapRawCocktailData } from "../mapRawCocktailData";
import { Link } from "react-router-dom";

//kunna söka efter en cocktail by name
//www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

//form med submit event
// resultat visas i lista med bara cocktail namn
// list 10 per sida sedan paginated
//ska kunna klicka på cocktail i listan och komma till cocktail info page

export function SearchPage(): ReactElement {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<ICocktail[] | null>(null);

  //funktion som hämtar api
  const fetchCocktailBySearch = async (searchTerm: string): Promise<ICocktail[]> => {
    const result = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );

    const data: { drinks: any[] } = await result.json();
    return data.drinks.map(mapRawCocktailData);
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await fetchCocktailBySearch(search);
    setSearchResult(result);
    console.log(search);
  };

  return (
    <>
      <p>Sök efter en drink</p>
      <form onSubmit={handleSubmit}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Sök</button>
      </form>
      <ul>
        {searchResult?.map((cocktail) => (
           <li><Link to={`/cocktail/${cocktail.id}`}>{cocktail.name}</Link></li> 
        ))}
      </ul>
    </>
  );
}
