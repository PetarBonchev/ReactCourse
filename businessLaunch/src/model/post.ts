import type { IdType, ImageUrl } from "../common/commonTypes";
import { LogEntry } from "./logEntry";

export class Post extends LogEntry {
  static className = "post";

  constructor(
    public authorId: IdType,
    public title: string,
    public image: ImageUrl,
    public text: Text,
    public likes: string
  ) {
    super();
  }
}
