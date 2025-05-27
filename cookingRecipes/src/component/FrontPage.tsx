import { Link } from "react-router-dom";
import { Role, type UserAccount } from "../model/user";
import type { IdType, Optional } from "../common/commonTypes";
import "./FrontPage.css";
import { useMemo, useState } from "react";
import RecipeFilter from "./recipe/RecipeFilter";
import RecipeList from "./recipe/RecipeList";
import type { Recipe } from "../model/recipe";

type Props = {
  loggedUser: Optional<UserAccount>;
  logout: () => void;
  recipes: Recipe[];
  filterRecipes: (tags: string[], author: IdType[] | null) => Recipe[];
  getIdsByUsername: (username: string) => IdType[];
  getUsername: (id: IdType) => string;
  onDelete: (id: IdType) => void;
};

const FrontPage = ({
  loggedUser,
  logout,
  recipes,
  filterRecipes,
  getIdsByUsername,
  getUsername,
  onDelete,
}: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const filteredRecipes = useMemo(
    () =>
      filterRecipes(
        tags,
        author.trim() == "" ? null : getIdsByUsername(author)
      ),
    [recipes, tags, author]
  );

  return (
    <div className="frontpage-layout">
      <header className="frontpage-header">
        <div className="frontpage-title">🍳 Cooking Recipes</div>
        <div className="frontpage-auth">
          {!loggedUser ? (
            <>
              <Link to="/login">
                <button className="frontpage-button">Login</button>
              </Link>
              <Link to="/register">
                <button className="frontpage-button">Register</button>
              </Link>
            </>
          ) : (
            <>
              <span className="frontpage-user">
                Hello, {loggedUser.user.username}
              </span>
              <Link to="/">
                <button className="frontpage-button" onClick={logout}>
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>
      </header>

      <aside className="frontpage-sidebar">
        <div className="frontpage-sidebar-card">
          {loggedUser?.role === Role.ADMIN && (
            <>
              <Link to="/users">
                <button className="frontpage-button full-width">Users</button>
              </Link>
              <Link to="/register">
                <button className="frontpage-button full-width">
                  Add User
                </button>
              </Link>
            </>
          )}
          {loggedUser && (
            <>
              <Link to={`/edit/${loggedUser.id}`}>
                <button className="frontpage-button full-width">
                  Edit Profile
                </button>
              </Link>
              <Link to={`/createRecipes`}>
                <button className="frontpage-button full-width">
                  Create recipe
                </button>
              </Link>
            </>
          )}
          <Link to={`/recipes`}>
            <button className="frontpage-button full-width">Recipes</button>
          </Link>
        </div>
      </aside>

      <main className="frontpage-main">
        <RecipeFilter
          tagFilter={tags}
          onTagFilterChange={setTags}
          authorFilter={author}
          onAuthorFilterChange={setAuthor}
        ></RecipeFilter>
        <RecipeList
          recipes={filteredRecipes}
          getUsername={getUsername}
          onDelete={onDelete}
          maxItems={10}
          showButtons={false}
        ></RecipeList>
      </main>
    </div>
  );
};

export default FrontPage;
