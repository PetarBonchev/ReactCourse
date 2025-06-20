import type { IdType, ProjectContent } from "../common/commonTypes";
import { LogEntry } from "./logEntry";

export class Project extends LogEntry {
  static className = "project";

  constructor(
    public authorId: IdType,
    public title: string,
    public redemptionPrice: number,
    public investmentGoal: number,
    public investmentOptions: InvestmentOption[],
    public content: ProjectContent[]
  ) {
    super();
  }
}

export enum InvestmentOption {
  PREORDER = 1,
  BUY_SHARES,
}
