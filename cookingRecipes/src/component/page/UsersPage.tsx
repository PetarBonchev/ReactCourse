import { useNavigate } from "react-router-dom";
import UserList from "../container/UserList";
import { useRepositories } from "../provider/RepositoryProvider";
import type { IdType } from "../../common/commonTypes";
import "./UsersPage.css";
import { useAuth } from "../provider/AuthProvider";
import { Role } from "../../model/user";

const UsersPage = () => {
  const { users } = useRepositories();
  const navigate = useNavigate();
  const { logedUser, logout } = useAuth();

  const onEdit = (id: IdType): void => {
    navigate(`/users/${id}`);
  };

  const onDelete = (id: IdType): void => {
    if (logedUser?.id === id) {
      logout();
      navigate("/");
    }
    users.deleteById(id);
  };

  return (
    <>
      <UserList
        users={users.entities}
        onEdit={onEdit}
        onDelete={onDelete}
        showButtons={logedUser?.role == Role.ADMIN}
      ></UserList>
      <button className="users-page-ok-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </>
  );
};

export default UsersPage;
