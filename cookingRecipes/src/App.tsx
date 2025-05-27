import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAsyncEffect from "./hook/useAsyncEffect";
import UserList from "./component/user/UserList";
import UserDataInput from "./component/user/UserDataInput";
import Login from "./component/user/Login";
import { useUsers } from "./hook/useUsers";
import FrontPage from "./component/FrontPage";
import { useRecipes } from "./hook/useRecipes";
import RecipeList from "./component/recipe/RecipeList";
import RecipeCreate from "./component/recipe/RecipeCreate";

const AppContent = () => {
  const userService = useUsers();
  const recipeService = useRecipes();

  useAsyncEffect(async () => {
    await userService.loadUsers();
    await recipeService.loadRecipes();
  }, []);

  return (
    <>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <FrontPage
                loggedUser={userService.loadUserFromSession()}
                logout={userService.signOut}
                filterRecipes={recipeService.filterRecipes}
                getIdsByUsername={userService.getIdsByUsername}
                recipes={recipeService.recipes}
                onDelete={recipeService.onDelete}
                getUsername={userService.getUsername}
              />
            }
          />
          <Route
            path="/users"
            element={
              <UserList
                users={userService.users}
                onDelete={userService.onDelete}
                onEdit={userService.handleEditClick}
              />
            }
          />
          <Route
            path="/recipes"
            element={
              <RecipeList
                recipes={recipeService.recipes}
                onDelete={recipeService.onDelete}
                getUsername={userService.getUsername}
                linkToHome={true}
              />
            }
          />
          <Route
            path="/recipes/:id"
            element={
              <RecipeCreate
                onSubmit={recipeService.onEdit}
                loggedUser={userService.loadUserFromSession()}
                getRecipe={recipeService.getRecipe}
              />
            }
          />
          <Route
            path="/createRecipes"
            element={
              <RecipeCreate
                onSubmit={recipeService.onCreate}
                loggedUser={userService.loadUserFromSession()}
                getRecipe={recipeService.getRecipe}
              />
            }
          />
          <Route
            path="/register"
            element={
              <UserDataInput
                onSubmit={userService.onCreate}
                getUser={userService.getUser}
                loggedUser={userService.loadUserFromSession()}
              />
            }
          />
          <Route
            path="/edit/:userId"
            element={
              <UserDataInput
                onSubmit={userService.onEdit}
                getUser={userService.getUser}
                loggedUser={userService.loadUserFromSession()}
              />
            }
          />
          <Route
            path="/login"
            element={<Login onSubmit={userService.login} />}
          />
        </Routes>
      </>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
