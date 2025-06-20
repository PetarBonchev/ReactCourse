import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./component/page/HomePage";
import RegisterPage from "./component/page/RegisterPage";
import CreatePostPage from "./component/page/CreatePostPage";
import CreateProjectPage from "./component/page/CreateProjectPage";
import ViewProjectPage from "./component/page/ViewProjectPage";
import ProjectsListPage from "./component/page/ProjectsListPage";
import LoginPage from "./component/page/LoginPage";
import { ROUTES } from "./common/Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.POST_CREATE} element={<CreatePostPage />} />
          <Route path={ROUTES.PROJECT_CREATE} element={<CreateProjectPage />} />
          <Route path={ROUTES.PROJECT_VIEW} element={<ViewProjectPage />} />
          <Route path={ROUTES.PROJECTS} element={<ProjectsListPage />} />
          <Route path={ROUTES.PROJECT_EDIT} element={<CreateProjectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
