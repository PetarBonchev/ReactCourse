import type { IdType } from "../common/commonTypes";

export class UserAccount {
  id: IdType = "";
  static className = "user";

  createDate: Date = new Date();
  modifyDate: Date = new Date();

  constructor(
    public user: UserData,
    public role?: Role,
    public status?: AccountStatus
  ) {
    if (!this.role) {
      this.role = Role.USER;
    }
    if (!this.status) {
      this.status = AccountStatus.ACTIVE;
    }
  }

  modifyUpdateTime = () => {
    this.modifyDate = new Date();
  };
}

export class UserData {
  constructor(
    public name: string,
    public username: string,
    public password: string,
    public gender: Gender,
    public photoUrl?: string,
    public description?: string
  ) {
    if (!this.photoUrl) {
      this.photoUrl = UserData.getDefaultPhotoUrl(this.gender);
    }
    if (!this.description) {
      this.description = "";
    }

    this.validateData();
  }

  private validateData(): void {
    this.validateName();
    this.validateUsername();
    this.validatePassword();
    this.validateDescription();
  }

  private validateName(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error("Enter name");
    }
    this.name = this.name.trim();
  }

  private validateUsername(): void {
    if (!this.username) {
      throw new Error("Enter username");
    }

    const usernameRegex = /^\w{1,15}$/;
    if (!usernameRegex.test(this.username)) {
      throw new Error("Username must be 1-15 word characters");
    }
  }

  private validatePassword(): void {
    if (!this.password) {
      throw new Error("Enter password");
    }

    if (this.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const hasDigit = /\d/.test(this.password);
    const hasSpecialChar = /[^\w]/.test(this.password);

    if (!hasDigit) {
      throw new Error("Password must contain at least one digit");
    }

    if (!hasSpecialChar) {
      throw new Error("Password must contain at least one special character");
    }
  }

  private validateDescription(): void {
    if (this.description && this.description.length > 512) {
      throw new Error("Description cannot exceed 512 characters");
    }
  }

  static getDefaultPhotoUrl(gender: Gender): string {
    return gender === Gender.MALE
      ? "src/assets/default-male.jpg"
      : "src/assets/default-female.png";
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
