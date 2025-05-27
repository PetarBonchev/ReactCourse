import { useNavigate } from "react-router-dom";
import "./FrontPage.css";
import { useAuth } from "../provider/AuthProvider";
import { Role } from "../../model/user";

const FrontPage = () => {
  const navigate = useNavigate();
  const { logedUser } = useAuth();

  return (
    <>
      <button className="frontpage-button" onClick={() => navigate("/users")}>
        Users
      </button>
      <button className="frontpage-button" onClick={() => navigate("/recipes")}>
        Recipes
      </button>
      {logedUser && (
        <button
          className="frontpage-button"
          onClick={() => navigate(`/users/${logedUser.id}`)}
        >
          Edit profile
        </button>
      )}
      {logedUser?.role === Role.ADMIN && (
        <button
          className="frontpage-button"
          onClick={() => navigate("/register")}
        >
          Add profile
        </button>
      )}
    </>
  );
};
export default FrontPage;
