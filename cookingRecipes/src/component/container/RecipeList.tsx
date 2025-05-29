import { useCallback } from "react";
import type { IdType } from "../../common/commonTypes";
import type { Recipe } from "../../model/recipe";
import RecipeItem from "../view/RecipeItem";
import "./RecipeList.css";
import EditDeleteButtons from "../common/EditDeleteButtons";

type Props = {
  recipes: Recipe[];
  getUsername: (id: IdType) => string;
  onEdit?: (id: IdType) => void;
  onDelete?: (id: IdType) => void;
  maxItems?: number;
  showButtons?: boolean;
};

const RecipeList = ({
  recipes,
  getUsername,
  onEdit = () => {},
  onDelete = () => {},
  maxItems = 0,
  showButtons = false,
}: Props) => {
  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(e.currentTarget.dataset.index);
      const recipe = recipes[index];
      if (recipe) onEdit(recipe.id);
    },
    [recipes, onEdit]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(e.currentTarget.dataset.index);
      const recipe = recipes[index];
      if (recipe) onDelete(recipe.id);
    },
    [recipes, onDelete]
  );

  return (
    <div className="recipe-list-wrapper">
      <h2 className="recipe-list-title">Recipes</h2>
      <div className="recipe-list-container">
        {recipes.slice(0, maxItems || recipes.length).map((recipe, index) => (
          <div key={recipe.id}>
            <RecipeItem
              recipe={recipe}
              authorUsername={getUsername(recipe.userId)}
            />
            {showButtons && (
              <EditDeleteButtons
                onEdit={handleEdit}
                onDelete={handleDelete}
                data-index={index}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
