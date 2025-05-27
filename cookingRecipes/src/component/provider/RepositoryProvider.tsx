import React, { createContext, useContext } from "react";
import useAsyncEffect from "../../hook/useAsyncEffect";
import useInMemoryRepository from "../../hook/useInMemoryRepository";
import { Recipe } from "../../model/recipe";
import { RecipeValidator } from "../../model/recipeValidator";
import { User } from "../../model/user";
import { UserValidator } from "../../model/userValidator";

type UserRepository = ReturnType<typeof useInMemoryRepository<User>>;
type RecipeRepository = ReturnType<typeof useInMemoryRepository<Recipe>>;

const RepositoriesContext = createContext<{
  users: UserRepository;
  recipes: RecipeRepository;
} | null>(null);

export const RepositoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const users = useInMemoryRepository<User>(User, new UserValidator());
  const recipes = useInMemoryRepository<Recipe>(Recipe, new RecipeValidator());

  useAsyncEffect(async () => {
    await users.findAll();
    await recipes.findAll();
  }, []);

  return (
    <RepositoriesContext.Provider value={{ users, recipes }}>
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositories = () => {
  const context = useContext(RepositoriesContext);
  if (!context) {
    throw new Error("must be used inside a RepositoriesProvider");
  }
  return context;
};
