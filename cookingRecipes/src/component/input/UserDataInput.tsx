import { useEffect, useState } from "react";
import { User, Gender, Role } from "../../model/user";
import { UserValidator } from "../../model/userValidator";
import "./UserDataInput.css";

type Props = {
  onSubmit: (user: User) => void;
  onCancel: () => void;
  userData?: User;
  showHidden?: boolean;
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

const UserDataInput = ({
  onSubmit,
  onCancel,
  userData = undefined,
  showHidden = false,
}: Props) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        username: userData.username || "",
        password: userData.password || "",
        gender: userData.gender || Gender.MALE,
        role: userData.role || Role.USER,
        photoUrl: userData.photoUrl || "",
        description: userData.description || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [userData]);

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

  const onSubmitData = async () => {
    try {
      const user = new User(
        formData.name,
        formData.username,
        formData.password,
        formData.gender,
        formData.photoUrl,
        formData.description,
        formData.role
      );
      const validator = new UserValidator();

      await validator.validate(user);

      user.id = userData ? userData.id : user.id;

      setErrorMessage("");

      onSubmit(user);
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
      <h2>{userData ? "Edit User" : "Register"}</h2>

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

      {showHidden && (
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
        {userData ? "Update" : "Submit"}
      </button>

      <button className="submit-button" onClick={onCancel}>
        Cancel
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
export default UserDataInput;
