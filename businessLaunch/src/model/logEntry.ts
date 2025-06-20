import type { IdType } from "../common/commonTypes";

export class LogEntry {
  id: IdType = "";

  createDate: Date = new Date();
  modifyDate: Date = new Date();
}
