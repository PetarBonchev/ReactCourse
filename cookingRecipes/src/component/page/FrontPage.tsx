import { useNavigate } from "react-router-dom";
import "./FrontPage.css";
import { useAuth } from "../provider/AuthProvider";
import { Role } from "../../model/user";
import RecipeFilter from "../view/RecipeFilter";
import { useState, useMemo } from "react";
import { useRepositories } from "../provider/RepositoryProvider";
import type { IdType } from "../../common/commonTypes";
import RecipeList from "../container/RecipeList";

const FrontPage = () => {
  const navigate = useNavigate();
  const { logedUser } = useAuth();

  const { users, recipes } = useRepositories();

  const getUsername = (id: IdType): string => {
    let user = undefined;
    if (users.entitiesMap.has(id)) {
      user = users.entitiesMap.get(id);
    }
    return user ? user.username : "Unknown";
  };

  const onEdit = (id: IdType): void => {
    navigate(`/recipes/${id}`);
  };

  const onDelete = (id: IdType): void => {
    recipes.deleteById(id);
  };

  const filterRecipes = (tags: string[], authors: IdType[] | null) => {
    return recipes.entities.filter(
      (recipe) =>
        (!tags || tags.every((tag) => recipe.tags.includes(tag))) &&
        (!authors || authors.includes(recipe.userId))
    );
  };

  const [tags, setTags] = useState<string[]>([]);
  const [author, setAuthor] = useState("");

  const getIdsByUsername = (username: string) => {
    return users.entities
      .filter((user) => user.username.startsWith(username))
      .map((user) => user.id);
  };

  const filteredRecipes = useMemo(
    () =>
      filterRecipes(
        tags,
        author.trim() == "" ? null : getIdsByUsername(author)
      ),
    [recipes, tags, author]
  );

  return (
    <>
      <button className="frontpage-button" onClick={() => navigate("/users")}>
        Users
      </button>
      <button className="frontpage-button" onClick={() => navigate("/recipes")}>
        Recipes
      </button>
      {logedUser && (
        <>
          <button
            className="frontpage-button"
            onClick={() => navigate(`/users/${logedUser.id}`)}
          >
            Edit profile
          </button>
          <button
            className="frontpage-button"
            onClick={() => navigate("/recipes/add")}
          >
            Add recipe
          </button>
        </>
      )}
      {logedUser?.role === Role.ADMIN && (
        <button
          className="frontpage-button"
          onClick={() => navigate("/register")}
        >
          Add profile
        </button>
      )}
      <br></br>
      <RecipeFilter
        tagFilter={tags}
        onTagFilterChange={setTags}
        authorFilter={author}
        onAuthorFilterChange={setAuthor}
      />
      <RecipeList
        recipes={filteredRecipes}
        getUsername={getUsername}
        onEdit={onEdit}
        onDelete={onDelete}
        showButtons={false}
        maxItems={10}
      />
    </>
  );
};
export default FrontPage;
