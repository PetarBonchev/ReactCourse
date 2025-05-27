import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiClient } from "../service/apiClient";
import { Recipe } from "../model/recipe";
import type { IdType, Optional } from "../common/commonTypes";

const BASE_URL = "http://localhost:9000";
const API = new ApiClient(BASE_URL);

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  const loadRecipes = async () => {
    const foundRecipes = await API.findAll(Recipe);
    setRecipes(foundRecipes);
  };

  const onCreate = async (recipe: Recipe) => {
    const { id, ...dto } = recipe;
    const created = await API.create(Recipe, dto);
    setRecipes((oldRecipes) => [...oldRecipes, created]);
    navigate("/");
  };

  const onEdit = async (recipe: Recipe) => {
    const old = recipes.find((r) => r.id === recipe.id);
    recipe.createDate = old ? old.createDate : recipe.createDate;

    const updated = await API.update(Recipe, recipe);
    setRecipes((oldRecipe) =>
      oldRecipe.map((r) => (r.id === recipe.id ? updated : r))
    );
    navigate("/");
  };

  const onDelete = async (id: IdType) => {
    await API.deleteById(Recipe, id as IdType);
    setRecipes(recipes.filter((recipe) => recipe.id != id));
  };

  const getRecipe = (recipeId: IdType): Optional<Recipe> => {
    return recipes.find((recipe) => recipe.id === recipeId);
  };

  const filterRecipes = (tags: string[], authors: IdType[] | null) => {
    return recipes.filter(
      (recipe) =>
        (!tags || tags.every((tag) => recipe.tags.includes(tag))) &&
        (!authors || authors.includes(recipe.userId))
    );
  };

  return {
    recipes,

    loadRecipes,
    onCreate,
    onEdit,
    onDelete,
    getRecipe,
    filterRecipes,
  };
};
