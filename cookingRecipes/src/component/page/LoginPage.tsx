import { useNavigate } from "react-router-dom";
import Login from "../input/Login";
import { useRepositories } from "../provider/RepositoryProvider";
import { useState } from "react";
import type { Optional } from "../../common/commonTypes";
import "./LoginPage.css";
import { useAuth } from "../provider/AuthProvider";
import { ROUTES } from "../../common/Routes";

const LoginPage = () => {
  const { login } = useAuth();
  const { users } = useRepositories();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<Optional<string>>(undefined);

  const onLogin = (username: string, password: string): void => {
    const user = users.entities.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setErrorMessage("Invalid username or password.");
      return;
    }

    login(user);
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <Login onSubmit={onLogin}></Login>
      <p className="error-message">{errorMessage}</p>
    </>
  );
};

export default LoginPage;
