import { useNavigate, useParams } from "react-router-dom";
import RecipeDataInput from "../input/RecipeDataInput";
import { useAuth } from "../provider/AuthProvider";
import { useRepositories } from "../provider/RepositoryProvider";
import { useState } from "react";
import { type Optional } from "../../common/commonTypes";
import { Recipe } from "../../model/recipe";
import useAsyncEffect from "../../hook/useAsyncEffect";

const InputRecipePage = () => {
  const navigate = useNavigate();
  const { logedUser } = useAuth();
  const { recipes } = useRepositories();

  const { id } = useParams();
  const [recipeData, setRecipeData] = useState<Optional<Recipe>>(undefined);

  useAsyncEffect(async () => {
    if (id) {
      const foundRecipe = await recipes.findById(id);
      setRecipeData(foundRecipe || undefined);
    }
  }, [id, recipes]);

  const add = (recipe: Recipe): void => {
    recipes.create(recipe);
    navigate("/");
  };

  const edit = async (recipe: Recipe): Promise<void> => {
    const toEdit = await recipes.findById(id || "");
    recipe.createDate = toEdit ? toEdit.createDate : recipe.createDate;
    recipes.update(recipe);
    navigate(-1);
  };

  const isEditing = Boolean(id && recipeData);

  const determineAuthor = (): string => {
    if (isEditing) {
      return recipeData ? recipeData.userId : "";
    }
    return logedUser ? logedUser.id : "";
  };

  return (
    <>
      <RecipeDataInput
        recipeData={isEditing ? recipeData : undefined}
        authorId={determineAuthor()}
        onCancel={() => navigate(-1)}
        onSubmit={isEditing ? edit : add}
      />
    </>
  );
};

export default InputRecipePage;
