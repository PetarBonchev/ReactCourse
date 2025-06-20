import { checkStringLength } from "../common/validationFunctions";
import type { User } from "./user";
import type { Validator } from "./validator";

export class UserValidator implements Validator<User> {
  public async validate(user: User): Promise<void> {
    this.checkNameFormat(user.name, 20, "Name");
    this.checkNameFormat(user.username, 15, "Username");
    this.checkPassword(user.password);
    checkStringLength(user.description || "", true, 512, "Description");
  }

  private checkNameFormat(
    name: string,
    maxLength: number,
    fieldName: string
  ): void {
    const nameRegex = new RegExp(`^[a-zA-Z]{3,${maxLength}}$`);
    if (!nameRegex.test(name)) {
      throw new Error(
        `${fieldName} must be 3-${maxLength} characters, using only letters (A-Z, a-z).`
      );
    }
  }

  private checkPassword(password: string): void {
    if (!password) {
      throw new Error("Enter password");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    if (!/\d/.test(password)) {
      throw new Error("Password must contain at least one digit");
    }

    if (!/[^\w]/.test(password)) {
      throw new Error("Password must contain at least one special character");
    }
  }
}
