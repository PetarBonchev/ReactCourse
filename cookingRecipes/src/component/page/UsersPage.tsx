import { useNavigate } from "react-router-dom";
import UserList from "../container/UserList";
import "./UsersPage.css";
import { useAuth } from "../provider/AuthProvider";
import { Role } from "../../model/user";
import { useUsers } from "../../hook/useUsers";
import { buildUserRoute } from "../../common/Routes";

const UsersPage = () => {
  const { users, deleteById } = useUsers();
  const navigate = useNavigate();
  const { logedUser } = useAuth();

  return (
    <>
      <UserList
        users={users}
        onEdit={(id) => navigate(buildUserRoute(id))}
        onDelete={(id) => deleteById(id, logedUser?.id)}
        showButtons={logedUser?.role == Role.ADMIN}
      ></UserList>
      <button className="users-page-ok-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </>
  );
};

export default UsersPage;
