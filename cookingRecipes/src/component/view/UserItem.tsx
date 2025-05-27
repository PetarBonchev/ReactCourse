import {
  Gender,
  getDefaultPhotoUrl,
  getUserGender,
  User,
} from "../../model/user";
import "./UserItem.css";

type Props = {
  user: User;
};

const UserItem = ({ user }: Props) => {
  return (
    <div className="user-card">
      <img
        src={user.photoUrl}
        alt="User"
        className="user-photo"
        onError={(e) => {
          e.currentTarget.src = getDefaultPhotoUrl(getUserGender(user.gender));
          e.preventDefault();
        }}
      />
      <div className="user-info">
        <p className="user-username">@{user.username}</p>
        <div className="user-meta">
          <span className="user-name">{user.name}</span>
          <span className="user-gender">
            {Gender[getUserGender(user.gender)].toLowerCase()}
          </span>
        </div>
        <p className="user-description">{user.description}</p>
      </div>
    </div>
  );
};

export default UserItem;
