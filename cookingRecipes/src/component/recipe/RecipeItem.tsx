import { useState } from "react";
import type { IdType } from "../../common/commonTypes";
import type { Recipe } from "../../model/recipe";
import "./RecipeItem.css";
import { Link } from "react-router-dom";

type Props = {
  recipe: Recipe;
  authorUsername: string;
  onDelete: (id: IdType) => void;
  showButtons?: boolean;
};

const RecipeItem = ({
  recipe,
  authorUsername,
  onDelete,
  showButtons = true,
}: Props) => {
  const [summarized, setSummmarized] = useState(true);

  return (
    <div className="recipe-item-container">
      <div className="recipe-card" onClick={() => setSummmarized((s) => !s)}>
        <div className="recipe-header">
          <p className="recipe-name">{recipe.name}</p>
          <p className="recipe-time">Time: {recipe.cookingDuration} min</p>
        </div>
        {!summarized && (
          <p className="recipe-author">Author: {authorUsername}</p>
        )}
        {!summarized && (
          <ul className="recipe-tags">
            {recipe.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}
        <p className="recipe-short-desc">
          {summarized
            ? recipe.shortDescription.substring(0, 150) +
              (recipe.shortDescription.length > 150 ? "..." : "")
            : recipe.shortDescription}
        </p>
        {!summarized && (
          <>
            <p>Products:</p>
            <ul className="recipe-products">
              {recipe.productsUsed.map((product) => (
                <li key={product}>{product}</li>
              ))}
            </ul>
          </>
        )}
        <img src={recipe.photoUrl} alt={recipe.name} className="recipe-image" />
        {!summarized && (
          <p className="recipe-full-desc">{recipe.fullDescription}</p>
        )}
      </div>
      {showButtons && (
        <div className="recipe-actions">
          <Link to={`/recipes/${recipe.id}`}>
            <button>✏️</button>
          </Link>
          <button onClick={() => onDelete(recipe.id as IdType)}>🗑️</button>
        </div>
      )}
    </div>
  );
};

export default RecipeItem;
