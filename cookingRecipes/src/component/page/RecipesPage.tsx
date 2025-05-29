import { useNavigate } from "react-router-dom";
import RecipeList from "../container/RecipeList";
import { useAuth } from "../provider/AuthProvider";
import { useUsers } from "../../hook/useUsers";
import { useRecipes } from "../../hook/useRecipes";
import { buildRecipeRoute } from "../../common/Routes";

const RecipesPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { getUsername } = useUsers();
  const { recipes, deleteById } = useRecipes();

  return (
    <>
      <RecipeList
        recipes={recipes}
        onEdit={(id) => navigate(buildRecipeRoute(id))}
        onDelete={deleteById}
        getUsername={getUsername}
        showButtons={isAdmin()}
      ></RecipeList>
    </>
  );
};

export default RecipesPage;
