import type { IdType } from "../../common/commonTypes";
import { Gender, UserData, type UserAccount } from "../../model/user";
import "./UserItem.css";

type Props = {
  account: UserAccount;
  onDelete: (id: IdType) => void;
  onEdit: (user: UserAccount) => void;
  showButtons?: boolean;
};

const UserItem = ({ account, onDelete, onEdit, showButtons = true }: Props) => {
  return (
    <div className="user-wrapper">
      <div className="user-card">
        <img
          src={account.user.photoUrl}
          alt="User"
          className="user-photo"
          onError={(e) => {
            e.currentTarget.src = UserData.getDefaultPhotoUrl(
              account.user.gender
            );
            e.preventDefault();
          }}
        />
        <div className="user-info">
          <p className="user-username">@{account.user.username}</p>
          <div className="user-meta">
            <span className="user-name">{account.user.name}</span>
            <span className="user-gender">
              {Gender[account.user.gender].toLowerCase()}
            </span>
          </div>
          <p className="user-description">{account.user.description}</p>
        </div>
      </div>
      {showButtons && (
        <div className="user-actions">
          <button className="action-button" onClick={() => onEdit(account)}>
            ✏️
          </button>
          <button
            className="action-button"
            onClick={() => onDelete(account.id as IdType)}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default UserItem;
