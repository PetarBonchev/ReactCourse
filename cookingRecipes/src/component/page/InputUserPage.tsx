import { useNavigate, useParams } from "react-router-dom";
import UserDataInput from "../input/UserDataInput";
import { useAuth } from "../provider/AuthProvider";
import { useRepositories } from "../provider/RepositoryProvider";
import { Gender, getDefaultPhotoUrl, Role, User } from "../../model/user";
import { useState } from "react";
import useAsyncEffect from "../../hook/useAsyncEffect";

const InputUserPage = () => {
  const navigate = useNavigate();
  const { logedUser } = useAuth();
  const { users } = useRepositories();

  const { id } = useParams();
  const [userData, setUserData] = useState<User | null>(null);

  useAsyncEffect(async () => {
    if (id) {
      const foundUser = await users.findById(id);
      setUserData(foundUser || null);
    }
  }, [id, users]);

  const register = (user: User): void => {
    if (users.entities.find((u) => u.username == user.username)) {
      throw new Error("This username is taken.");
    }
    users.create(user);
    navigate("/");
  };

  const edit = async (user: User): Promise<void> => {
    const old = await users.findById(user.id);
    user.createDate = old ? old.createDate : user.createDate;
    if (
      user.photoUrl == getDefaultPhotoUrl(Gender.FEMALE) ||
      user.photoUrl == getDefaultPhotoUrl(Gender.MALE)
    ) {
      user.photoUrl = getDefaultPhotoUrl(user.gender || Gender.MALE);
    }
    users.update(user);
    navigate(-1);
  };

  const isEditing = Boolean(id && userData);

  return (
    <UserDataInput
      userData={(isEditing ? userData : undefined) || undefined}
      onSubmit={isEditing ? edit : register}
      onCancel={() => navigate(-1)}
      showHidden={logedUser?.role === Role.ADMIN}
    />
  );
};

export default InputUserPage;
