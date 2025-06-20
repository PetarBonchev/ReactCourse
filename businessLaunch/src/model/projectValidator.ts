import { checkStringLength } from "../common/validationFunctions";
import type { Project } from "./project";
import type { Validator } from "./validator";

export class ProjectValidator implements Validator<Project> {
  validate(project: Project): Promise<void> {
    checkStringLength(project.title, false, 128, "Title");
  }
}
