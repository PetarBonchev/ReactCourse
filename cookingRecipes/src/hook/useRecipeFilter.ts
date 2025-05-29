import { useState, useMemo } from "react";
import type { IdType } from "../common/commonTypes";
import { useRepositories } from "../component/provider/RepositoryProvider";
import type { Recipe } from "../model/recipe";
import { useUsers } from "./useUsers";

export const useRecipeFilter = () => {
  const { recipes } = useRepositories();
  const { getIdsByUsername } = useUsers();
  const [tags, setTags] = useState<string[]>([]);
  const [author, setAuthor] = useState("");

  const filterRecipes = (
    tags: string[],
    authors: IdType[] | null
  ): Recipe[] => {
    return recipes.entities
      .filter(
        (recipe) =>
          (!tags.length || tags.every((tag) => recipe.tags.includes(tag))) &&
          (!authors || authors.includes(recipe.userId))
      )
      .sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );
  };

  const filteredRecipes = useMemo(
    () =>
      filterRecipes(
        tags,
        author.trim() === "" ? null : getIdsByUsername(author)
      ),
    [recipes.entities, tags, author, getIdsByUsername]
  );

  return {
    tags,
    setTags,
    author,
    setAuthor,
    filteredRecipes,
  };
};
