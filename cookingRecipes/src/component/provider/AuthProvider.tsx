import {
  createContext,
  type ReactNode,
  useState,
  useCallback,
  useContext,
} from "react";
import type { Optional } from "../../common/commonTypes";
import {
  loadUserFromSession,
  saveUserToSession,
  removeUserFromSession,
} from "../../common/userSessionStorage";
import { Role, type User } from "../../model/user";
import { useRepositories } from "./RepositoryProvider";
import useAsyncEffect from "../../hook/useAsyncEffect";

type AuthContextType = {
  logedUser: Optional<User>;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: () => boolean;
};

const AuthContext = createContext<Optional<AuthContextType>>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [logedUser, setLogedUser] = useState<Optional<User>>(
    loadUserFromSession()
  );

  const { users } = useRepositories();

  const isAdmin = useCallback(() => {
    return logedUser?.role === Role.ADMIN;
  }, [logedUser]);

  useAsyncEffect(async () => {
    update();
  }, [users.entities]);

  const login = useCallback((user: User) => {
    saveUserToSession(user);
    setLogedUser(user);
  }, []);

  const logout = useCallback(() => {
    removeUserFromSession();
    setLogedUser(undefined);
  }, []);

  const update = async () => {
    if (!logedUser) return;
    const updatedUser = await users.findById(logedUser.id);
    setLogedUser(updatedUser);
    if (updatedUser) {
      saveUserToSession(updatedUser);
    } else {
      removeUserFromSession();
    }
  };

  return (
    <AuthContext.Provider value={{ logedUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("must be used inside an AuthProvider");
  return ctx;
};
