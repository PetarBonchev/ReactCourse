import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./component/page/FrontPage";
import { RepositoryProvider } from "./component/provider/RepositoryProvider";
import UsersPage from "./component/page/UsersPage";
import LoginPage from "./component/page/LoginPage";
import HeaderItem from "./component/HeaderItem";
import { AuthProvider } from "./component/provider/AuthProvider";
import InputUserPage from "./component/page/InputUserPage";
import RecipesPage from "./component/page/RecipesPage";

function App() {
  return (
    <>
      <RepositoryProvider>
        <AuthProvider>
          <BrowserRouter>
            <HeaderItem />
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<InputUserPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<InputUserPage />} />
              <Route path="/recipes" element={<RecipesPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </RepositoryProvider>
    </>
  );
}

export default App;
