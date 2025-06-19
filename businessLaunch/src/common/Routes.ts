export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USERS: "/users",
  USER_EDIT: "/users/:id",
  PROJECTS: "/projects",
  PROJECT_VIEW: "/projects/:id",
  PROJECT_EDIT: "/projects/:id/edit",
  PROJECT_CREATE: "/projects/add",
  POST_CREATE: "/posts/add",
} as const;

export const buildUserRoute = (id: string) => `/users/${id}`;
export const buildProjectRoute = (id: string) => `/projects/${id}/edit`;
export const viewProjectRoute = (id: string) => `/projects/${id}`;
