import { useCallback } from "react";
import type { IdType } from "../../common/commonTypes";
import type { User } from "../../model/user";
import EditDeleteButtons from "../common/EditDeleteButtons";
import UserItem from "../view/UserItem";
import "./UserList.css";

type Props = {
  users: User[];
  onEdit: (id: IdType) => void;
  onDelete: (id: IdType) => void;
  showButtons?: boolean;
};

const UserList = ({ users, onEdit, onDelete, showButtons = false }: Props) => {
  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(e.currentTarget.dataset.index);
      const user = users[index];
      if (user) onEdit(user.id);
    },
    [users, onEdit]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(e.currentTarget.dataset.index);
      const user = users[index];
      if (user) onDelete(user.id);
    },
    [users, onDelete]
  );

  return (
    <div className="user-list-wrapper">
      <h2 className="user-list-title">Accounts</h2>
      <div className="user-list-container">
        {users.map((user, index) => (
          <div key={user.id}>
            <UserItem user={user} />
            <EditDeleteButtons
              onEdit={handleEdit}
              onDelete={handleDelete}
              show={showButtons}
              data-index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
