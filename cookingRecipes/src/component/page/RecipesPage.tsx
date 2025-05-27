import { useNavigate } from "react-router-dom";
import RecipeList from "../container/RecipeList";
import { useRepositories } from "../provider/RepositoryProvider";
import { useAuth } from "../provider/AuthProvider";
import { Role } from "../../model/user";
import type { IdType } from "../../common/commonTypes";

const RecipesPage = () => {
  const { users, recipes } = useRepositories();
  const navigate = useNavigate();
  const { logedUser } = useAuth();

  const getUsername = (id: IdType): string => {
    let user = undefined;
    if (users.entitiesMap.has(id)) {
      user = users.entitiesMap.get(id);
    }
    return user ? user.username : "Unknown";
  };

  const onEdit = (id: IdType): void => {
    navigate(`/recipes/${id}`);
  };

  const onDelete = (id: IdType): void => {
    recipes.deleteById(id);
  };

  return (
    <>
      <RecipeList
        recipes={recipes.entities}
        onEdit={onEdit}
        onDelete={onDelete}
        getUsername={getUsername}
        showButtons={logedUser?.role === Role.ADMIN}
      ></RecipeList>
    </>
  );
};

export default RecipesPage;
