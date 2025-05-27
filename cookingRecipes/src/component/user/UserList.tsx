import type { UserAccount } from "../../model/user";
import type { IdType } from "../../common/commonTypes";
import UserItem from "./UserItem";
import { Link } from "react-router-dom";
import "./UserList.css";

type Props = {
  users: UserAccount[];
  onDelete: (id: IdType) => void;
  onEdit: (user: UserAccount) => void;
  showButtons?: boolean;
};

const UserList = ({ users, onDelete, onEdit, showButtons = true }: Props) => {
  return (
    <div className="user-list-wrapper">
      <h2 className="user-list-title">User Accounts</h2>
      <div className="user-list-container">
        {users.map((user) => (
          <UserItem
            key={user.id}
            account={user}
            onDelete={onDelete}
            onEdit={onEdit}
            showButtons={showButtons}
          />
        ))}
      </div>
      <Link to={"/"}>
        <button className="user-list-ok-button">Ok</button>
      </Link>
    </div>
  );
};

export default UserList;
