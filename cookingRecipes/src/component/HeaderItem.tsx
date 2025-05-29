import { useNavigate } from "react-router-dom";
import "./HeaderItem.css";
import { useAuth } from "./provider/AuthProvider";

const HeaderItem = () => {
  const navigate = useNavigate();

  const { logedUser, logout } = useAuth();

  const onLogout = (): void => {
    logout();
    navigate("/");
  };

  return (
    <header className="header-item">
      <div className="header-title" onClick={() => navigate("/")}>
        🍳 Cooking Recipes
      </div>
      <div className="header-auth">
        {!logedUser ? (
          <>
            <button
              className="header-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="header-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <span className="header-user">Hello, {logedUser.username}</span>
            <button className="header-button" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};
export default HeaderItem;
