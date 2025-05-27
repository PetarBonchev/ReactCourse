import { Link } from "react-router-dom";
import type { IdType } from "../../common/commonTypes";
import type { Recipe } from "../../model/recipe";
import RecipeItem from "./RecipeItem";
import "./RecipeList.css";

type Props = {
  recipes: Recipe[];
  getUsername: (id: IdType) => string;
  onDelete: (id: IdType) => void;
  linkToHome?: boolean;
  maxItems?: number;
  showButtons?: boolean;
};

const RecipeList = ({
  recipes,
  getUsername,
  onDelete,
  linkToHome = false,
  maxItems = 0,
  showButtons = true,
}: Props) => {
  return (
    <>
      {linkToHome && (
        <Link to={"/"}>
          <button className="recipe-list-back-button">Home</button>
        </Link>
      )}
      <ul className="recipe-list-container">
        {recipes.slice(0, maxItems || recipes.length).map((recipe) => (
          <RecipeItem
            key={recipe.id}
            onDelete={onDelete}
            recipe={recipe}
            authorUsername={getUsername(recipe.userId)}
            showButtons={showButtons}
          />
        ))}
      </ul>
    </>
  );
};

export default RecipeList;
