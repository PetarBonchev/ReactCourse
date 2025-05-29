export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USERS: "/users",
  USER_EDIT: "/users/:id",
  RECIPES: "/recipes",
  RECIPE_EDIT: "/recipes/:id",
  RECIPE_CREATE: "/recipes/add",
} as const;

export const buildUserRoute = (id: string) => `/users/${id}`;
export const buildRecipeRoute = (id: string) => `/recipes/${id}`;
