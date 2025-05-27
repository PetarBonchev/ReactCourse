import type { IdType } from "../common/commonTypes";
import { LogEntry } from "./logEntry";

export class Recipe extends LogEntry {
  static className = "recipe";

  constructor(
    public userId: IdType,
    public name: string,
    public shortDescription: string,
    public cookingDuration: number,
    public productsUsed: string[],
    public photoUrl: string,
    public fullDescription: string,
    public tags: string[]
  ) {
    super();
  }
}
