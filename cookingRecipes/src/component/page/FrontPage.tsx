import { useNavigate } from "react-router-dom";
import "./FrontPage.css";
import { useAuth } from "../provider/AuthProvider";
import { Role } from "../../model/user";
import RecipeFilter from "../view/RecipeFilter";
import RecipeList from "../container/RecipeList";
import { useUsers } from "../../hook/useUsers";
import { useRecipeFilter } from "../../hook/useRecipeFilter";
import { ROUTES, buildUserRoute } from "../../common/Routes";

const FrontPage = () => {
  const navigate = useNavigate();
  const { logedUser } = useAuth();
  const { tags, setTags, author, setAuthor, filteredRecipes } =
    useRecipeFilter();
  const { getUsername } = useUsers();

  return (
    <div className="frontpage-container">
      <aside className="frontpage-sidebar">
        <div className="frontpage-sidebar-card">
          <button
            className="frontpage-button"
            onClick={() => navigate(ROUTES.USERS)}
          >
            Users
          </button>
          <button
            className="frontpage-button"
            onClick={() => navigate(ROUTES.RECIPES)}
          >
            Recipes
          </button>
          {logedUser && (
            <>
              <button
                className="frontpage-button"
                onClick={() => navigate(buildUserRoute(logedUser.id))}
              >
                Edit profile
              </button>
              <button
                className="frontpage-button"
                onClick={() => navigate(ROUTES.RECIPE_CREATE)}
              >
                Add recipe
              </button>
            </>
          )}
          {logedUser?.role === Role.ADMIN && (
            <button
              className="frontpage-button"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Add profile
            </button>
          )}
        </div>
      </aside>
      <main className="frontpage-content">
        <RecipeFilter
          tagFilter={tags}
          onTagFilterChange={setTags}
          authorFilter={author}
          onAuthorFilterChange={setAuthor}
        />
        <RecipeList
          recipes={filteredRecipes}
          getUsername={getUsername}
          showButtons={false}
          maxItems={10}
        />
      </main>
    </div>
  );
};
export default FrontPage;
