import { useState, type ReactElement } from "react";
import type { ICocktail } from "../util/Types";
import { mapRawCocktailData } from "../mapRawCocktailData";
import { Link } from "react-router-dom";

export function SearchPage(): ReactElement {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<ICocktail[]>([]);
  const [page, setPage] = useState<number>(1);

  //funktion som hämtar api
  const fetchCocktailBySearch = async (
    searchTerm: string
  ): Promise<ICocktail[]> => {
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

  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const visibleResults = searchResult.slice(startIndex, endIndex);
  const totalPages = Math.ceil(searchResult.length / 10);

  return (
    <>
      <main className="searchpage" >
        <p>Sök efter en drink</p>
        <form onSubmit={handleSubmit}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="button" type="submit">
            Sök
          </button>
        </form>
        <ul>
          {visibleResults?.map((cocktail) => (
            <li key={cocktail.id}>
              <Link to={`/cocktail/${cocktail.id}`}>{cocktail.name}</Link>
            </li>
          ))}
        </ul>
    <div className="pagination">
  <button
    className="button"
    onClick={() => page > 1 && setPage(page - 1)}
    disabled={page === 1}
  >
    Föregående
  </button>
  <button
    className="button"
    onClick={() => page < totalPages && setPage(page + 1)}
    disabled={page === totalPages}
  >
    Nästa
  </button>
</div>
      </main>
    </>
  );
}
