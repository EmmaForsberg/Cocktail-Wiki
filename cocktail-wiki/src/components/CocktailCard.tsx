import type { ReactElement } from "react";
import type { ICocktail } from "../util/Types";
import { Link } from "react-router-dom";

interface CocktailCardProps {
  cocktail: ICocktail;
}

export function CocktailCard({ cocktail }: CocktailCardProps): ReactElement {
  return (
    <>
      <article className="cocktail-card">
        <h2>{cocktail.name}</h2>
        <img src={cocktail.thumbnail} alt={cocktail.name} />
        <div className="button-wrapper">
          <Link to={`/cocktail/${cocktail.id}`}>
            <button className="button">See more</button>
          </Link>
        </div>
      </article>
    </>
  );
}
