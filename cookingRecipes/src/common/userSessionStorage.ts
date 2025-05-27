import { User } from "../model/user";
import type { Optional } from "./commonTypes";

export const removeUserFromSession = () => {
  sessionStorage.removeItem("userAccount");
};

export const saveUserToSession = (user: User) => {
  sessionStorage.setItem("userAccount", JSON.stringify(user));
};

export const loadUserFromSession = (): Optional<User> => {
  const raw = sessionStorage.getItem("userAccount");
  if (!raw) return undefined;

  const parsed = JSON.parse(raw);
  const user = new User(
    parsed.name,
    parsed.username,
    parsed.password,
    parsed.gender,
    parsed.photoUrl,
    parsed.description,
    parsed.role,
    parsed.status
  );
  user.id = parsed.id;
  return user;
};
