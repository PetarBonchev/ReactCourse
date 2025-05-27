import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiClient } from "../service/apiClient";
import { UserAccount } from "../model/user";
import type { IdType, Optional } from "../common/commonTypes";

const BASE_URL = "http://localhost:9000";
const API = new ApiClient(BASE_URL);

export const useUsers = () => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const navigate = useNavigate();

  const loadUsers = async () => {
    const foundUsers = await API.findAll(UserAccount);
    setUsers(foundUsers);
  };

  const onDelete = async (id: IdType) => {
    await API.deleteById(UserAccount, id as IdType);
    setUsers(users.filter((user) => user.id != id));
    if (loadUserFromSession()?.id == id) {
      signOut();
    }
  };

  const onEdit = async (user: UserAccount) => {
    const old = users.find((u) => u.id === user.id);
    user.createDate = old ? old.createDate : user.createDate;

    const updated = await API.update(UserAccount, user);
    setUsers((oldUsers) =>
      oldUsers.map((u) => (u.id === user.id ? updated : u))
    );
    navigate("/");
  };

  const onCreate = async (user: UserAccount) => {
    const { id, ...dto } = user;
    const created = await API.create(UserAccount, dto);
    setUsers((oldUsers) => [...oldUsers, created]);
    navigate("/");
  };

  const handleEditClick = (user: UserAccount) => {
    navigate(`/edit/${user.id}`);
  };

  const login = (username: string, password: string) => {
    const user = users.find(
      (u) => u.user.username === username && u.user.password === password
    );

    if (!user) {
      return;
    }

    saveUserToSession(user);
    navigate("/");
  };

  const signOut = () => {
    sessionStorage.removeItem("userAccount");
    navigate("/");
  };

  const saveUserToSession = (user: UserAccount) => {
    sessionStorage.setItem("userAccount", JSON.stringify(user));
  };

  const loadUserFromSession = (): Optional<UserAccount> => {
    const userData = sessionStorage.getItem("userAccount");
    if (!userData) return undefined;

    const parsedData = JSON.parse(userData);
    const newUser = new UserAccount(
      parsedData.user,
      parsedData.role,
      parsedData.status
    );
    newUser.id = parsedData.id;
    return newUser;
  };

  const getUser = (userId: string): Optional<UserAccount> => {
    return users.find((user) => user.id?.toString() === userId);
  };

  const getUsername = (id: IdType): string => {
    const user = getUser(id);
    return user ? user.user.username : "";
  };

  const getIdsByUsername = (username: string) => {
    return users
      .filter((user) => user.user.username.startsWith(username))
      .map((user) => user.id);
  };

  return {
    users,

    loadUsers,
    onDelete,
    onEdit,
    onCreate,
    handleEditClick,
    login,
    signOut,
    loadUserFromSession,
    getUser,
    getUsername,
    getIdsByUsername,
  };
};
