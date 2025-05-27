import {
  checkImageActualUrl,
  checkStringLength,
} from "../common/validationFunctions";
import type { Recipe } from "./recipe";
import type { Validator } from "./validator";

export class RecipeValidator implements Validator<Recipe> {
  public async validate(recipe: Recipe): Promise<void> {
    checkStringLength(recipe.name, false, 80, "Recipe name");
    checkStringLength(recipe.shortDescription, false, 256, "Short description");
    checkStringLength(recipe.fullDescription, false, 2048, "Full description");
    await checkImageActualUrl(recipe.photoUrl);
  }
}
