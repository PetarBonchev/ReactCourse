import { useNavigate, useParams } from "react-router-dom";
import RecipeDataInput from "../input/RecipeDataInput";
import { useAuth } from "../provider/AuthProvider";
import { useRecipes } from "../../hook/useRecipes";

const InputRecipePage = () => {
  const navigate = useNavigate();
  const { logedUser } = useAuth();
  const { id } = useParams();

  const { recipeData, isEditing, handleSubmit } =
    useRecipes().useRecipeForm(id);

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
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default InputRecipePage;
