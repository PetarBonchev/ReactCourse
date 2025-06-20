import { LogEntry } from "./logEntry";

export class User extends LogEntry {
  static className = "user";

  constructor(
    public name: string,
    public username: string,
    public password: string,

    public gender?: Gender,
    public photoUrl?: string,
    public description?: string,
    public role?: Role,
    public status?: AccountStatus
  ) {
    super();
    this.gender = getUserGender(gender);
    this.photoUrl = photoUrl || getDefaultPhotoUrl(this.gender);
    this.description = description || "";
    this.role = role || Role.USER;
    this.status = status || AccountStatus.ACTIVE;
  }
}

export enum Gender {
  MALE = 1,
  FEMALE,
}

export enum AccountStatus {
  ACTIVE = 1,
  SUSPENDED,
  DEACTIVATED,
}

export enum Role {
  USER = 1,
  ADMIN,
}

export const getDefaultPhotoUrl = (gender: Gender): string => {
  return gender === Gender.MALE
    ? "src/assets/default-male.jpg"
    : "src/assets/default-female.png";
};

export const getUserGender = (gender?: Gender): Gender => {
  return gender || Gender.MALE;
};
