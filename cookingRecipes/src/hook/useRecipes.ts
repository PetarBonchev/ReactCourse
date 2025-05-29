import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IdType, Optional } from "../common/commonTypes";
import { useRepositories } from "../component/provider/RepositoryProvider";
import type { Recipe } from "../model/recipe";
import useAsyncEffect from "./useAsyncEffect";
import { ROUTES } from "../common/Routes";

export const useRecipes = () => {
  const navigate = useNavigate();
  const { recipes } = useRepositories();

  const create = async (recipe: Recipe): Promise<void> => {
    await recipes.create(recipe);
  };

  const update = async (recipe: Recipe, originalId: string): Promise<void> => {
    const existing = await recipes.findById(originalId);
    const updated = {
      ...recipe,
      createDate: existing ? existing.createDate : recipe.createDate,
    };
    await recipes.update(updated);
  };

  const deleteById = (id: IdType): void => {
    recipes.deleteById(id);
  };

  const findById = async (id: string): Promise<Optional<Recipe>> => {
    return await recipes.findById(id);
  };

  const filterRecipes = (
    allRecipes: Recipe[],
    tags: string[],
    authorIds: IdType[] | null
  ): Recipe[] => {
    return allRecipes.filter(
      (recipe) =>
        (!tags.length || tags.every((tag) => recipe.tags.includes(tag))) &&
        (!authorIds || authorIds.includes(recipe.userId))
    );
  };

  const useRecipeForm = (id?: string) => {
    const [recipeData, setRecipeData] = useState<Optional<Recipe>>(undefined);
    const [loading, setLoading] = useState(false);

    useAsyncEffect(async () => {
      if (id) {
        setLoading(true);
        try {
          const found = await findById(id);
          setRecipeData(found || undefined);
        } finally {
          setLoading(false);
        }
      }
    }, [id]);

    const isEditing = Boolean(id && recipeData);

    const handleSubmit = async (recipe: Recipe): Promise<void> => {
      if (isEditing && id) {
        await update(recipe, id);
        navigate(-1);
      } else {
        await create(recipe);
        navigate(ROUTES.HOME);
      }
    };

    return {
      recipeData,
      isEditing,
      loading,
      handleSubmit,
    };
  };

  return {
    recipes: recipes.entities,
    create,
    update,
    deleteById,
    findById,
    filterRecipes,
    useRecipeForm,
  };
};
