import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IdType, Optional } from "../common/commonTypes";
import { useAuth } from "../component/provider/AuthProvider";
import { useRepositories } from "../component/provider/RepositoryProvider";
import { User, getDefaultPhotoUrl, Gender } from "../model/user";
import useAsyncEffect from "./useAsyncEffect";
import { ROUTES } from "../common/Routes";

export const useUsers = () => {
  const navigate = useNavigate();
  const { users } = useRepositories();
  const { logout } = useAuth();

  const create = async (user: User): Promise<void> => {
    if (users.entities.find((u) => u.username === user.username)) {
      throw new Error("This username is taken.");
    }
    await users.create(user);
  };

  const update = async (user: User, originalId: string): Promise<void> => {
    const existing = await users.findById(originalId);
    const updated = {
      ...user,
      createDate: existing ? existing.createDate : user.createDate,
    };

    if (
      updated.photoUrl === getDefaultPhotoUrl(Gender.FEMALE) ||
      updated.photoUrl === getDefaultPhotoUrl(Gender.MALE)
    ) {
      updated.photoUrl = getDefaultPhotoUrl(updated.gender || Gender.MALE);
    }

    await users.update(updated);
  };

  const deleteById = (id: IdType, currentUserId?: IdType): void => {
    if (currentUserId === id) {
      logout();
      navigate(ROUTES.HOME);
    }
    users.deleteById(id);
  };

  const findById = async (id: string): Promise<Optional<User>> => {
    return await users.findById(id);
  };

  const getUsername = (id: IdType): string => {
    const user = users.entitiesMap.get(id);
    return user ? user.username : "Unknown";
  };

  const getIdsByUsername = (username: string): IdType[] => {
    return users.entities
      .filter((user) => user.username.startsWith(username))
      .map((user) => user.id);
  };

  const authenticateUser = (
    username: string,
    password: string
  ): User | null => {
    return (
      users.entities.find(
        (u) => u.username === username && u.password === password
      ) || null
    );
  };

  const useUserForm = (id?: string) => {
    const [userData, setUserData] = useState<Optional<User>>(undefined);
    const [loading, setLoading] = useState(false);

    useAsyncEffect(async () => {
      if (id) {
        setLoading(true);
        try {
          const found = await findById(id);
          setUserData(found || undefined);
        } finally {
          setLoading(false);
        }
      }
    }, [id]);

    const isEditing = Boolean(id && userData);

    const handleSubmit = async (user: User): Promise<void> => {
      if (isEditing && id) {
        if (getIdsByUsername(user.username).length) {
          throw new Error("This username is taken.");
        }
        await update(user, id);
        navigate(-1);
      } else {
        await create(user);
        navigate(ROUTES.HOME);
      }
    };

    return {
      userData,
      isEditing,
      loading,
      handleSubmit,
    };
  };

  return {
    users: users.entities,
    usersMap: users.entitiesMap,
    create,
    update,
    deleteById,
    findById,
    getUsername,
    getIdsByUsername,
    authenticateUser,
    useUserForm,
  };
};
