import { useNavigate, useParams } from "react-router-dom";
import UserDataInput from "../input/UserDataInput";
import { useAuth } from "../provider/AuthProvider";
import { useUsers } from "../../hook/useUsers";

const InputUserPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const { userData, isEditing, handleSubmit } = useUsers().useUserForm(id);

  return (
    <UserDataInput
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      userData={(isEditing ? userData : undefined) || undefined}
      showHidden={isAdmin()}
    />
  );
};

export default InputUserPage;
