import { useEffect, useState } from "react";
import { UserAccount, UserData, Gender, Role } from "../../model/user";
import { useParams } from "react-router-dom";
import type { Optional } from "../../common/commonTypes";
import "./UseerDataInput.css";
import { Link } from "react-router-dom";

type Props = {
  onSubmit: (user: UserAccount) => void;
  getUser: (userId: string) => Optional<UserAccount>;
  loggedUser: Optional<UserAccount>;
};

const emptyForm = {
  name: "",
  username: "",
  password: "",
  gender: Gender.MALE,
  role: Role.USER,
  photoUrl: "",
  description: "",
};

const UserDataInput = ({ onSubmit, getUser, loggedUser }: Props) => {
  const { userId } = useParams();
  const placedUser = getUser(userId || "");

  const [formData, setFormData] = useState(emptyForm);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (placedUser) {
      setFormData({
        name: placedUser.user.name || "",
        username: placedUser.user.username || "",
        password: placedUser.user.password || "",
        gender: placedUser.user.gender || Gender.MALE,
        role: placedUser.role || Role.USER,
        photoUrl: placedUser.user.photoUrl || "",
        description: placedUser.user.description || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [userId, placedUser]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gender" || name == "role" ? Number(value) : value,
    }));
  };

  const onSubmitData = () => {
    try {
      const userData = new UserData(
        formData.name,
        formData.username,
        formData.password,
        formData.gender,
        formData.photoUrl,
        formData.description
      );

      const userAccount = new UserAccount(userData, formData.role);
      userAccount.id = placedUser ? placedUser.id : userAccount.id;

      setErrorMessage("");

      if (!placedUser) {
        setFormData(emptyForm);
      }

      onSubmit(userAccount);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="user-form-container">
      <h2>{placedUser ? "Edit User" : "Register"}</h2>

      <div className="form-group">
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Username:</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value={Gender.MALE}>Male</option>
          <option value={Gender.FEMALE}>Female</option>
        </select>
      </div>

      {loggedUser?.role == Role.ADMIN && (
        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value={Role.USER}>User</option>
            <option value={Role.ADMIN}>Admin</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Describe yourself:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Photo URL:</label>
        <input
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleInputChange}
        />
      </div>

      <button className="submit-button" onClick={onSubmitData}>
        {placedUser ? "Update" : "Submit"}
      </button>

      <Link to={"/"}>
        <button className="submit-button">Cancel</button>
      </Link>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
export default UserDataInput;
