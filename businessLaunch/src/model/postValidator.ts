import {
  checkImageActualUrl,
  checkStringLength,
} from "../common/validationFunctions";
import type { Post } from "./post";
import type { Validator } from "./validator";

export class PostValidator implements Validator<Post> {
  validate(post: Post): Promise<void> {
    checkImageActualUrl(post.image);
    checkStringLength(post.title, false, 128, "Title");
    checkStringLength(
      post.text as unknown as string,
      true,
      1024,
      "Description"
    );
    return Promise.resolve();
  }
}
