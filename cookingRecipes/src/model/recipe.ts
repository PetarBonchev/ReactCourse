import type { IdType } from "../common/commonTypes";

export class Recipe {
  id: IdType = "";
  static className = "recipe";

  createDate: Date = new Date();
  modifyDate: Date = new Date();

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
    this.validateData();
  }

  private validateData(): void {
    this.validateName();
    this.validateShortDescription();
    this.validateCookingDuration();
    this.validateProductsUsed();
    this.validatePhotoUrl();
    this.validateFullDescription();
    this.validateTags();
  }

  private validateName(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error("Recipe name is required.");
    }
    if (this.name.length > 80) {
      throw new Error("Recipe name cannot exceed 80 characters.");
    }
  }

  private validateShortDescription(): void {
    if (!this.shortDescription || this.shortDescription.trim().length === 0) {
      throw new Error("Short description is required.");
    }
    if (this.shortDescription.length > 256) {
      throw new Error("Short description cannot exceed 256 characters.");
    }
  }

  private validateCookingDuration(): void {
    if (this.cookingDuration <= 0) {
      throw new Error("Cooking duration must be a positive number.");
    }
  }

  private validateProductsUsed(): void {
    if (!this.productsUsed || this.productsUsed.length === 0) {
      throw new Error("At least one product must be used.");
    }
  }

  private validatePhotoUrl(): void {
    if (!this.photoUrl || this.photoUrl.length === 0) {
      throw new Error("Photo URL is required.");
    }

    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
    if (!urlPattern.test(this.photoUrl)) {
      throw new Error("Invalid photo url.");
    }
  }

  private validateFullDescription(): void {
    if (!this.fullDescription || this.fullDescription.trim().length === 0) {
      throw new Error("Full description is required.");
    }
    if (this.fullDescription.length > 2048) {
      throw new Error("Full description cannot exceed 2048 characters.");
    }
  }

  private validateTags(): void {
    if (!this.tags) {
      throw new Error("Tags cannot be null.");
    }
    if (!Array.isArray(this.tags)) {
      throw new Error("Tags must be a list.");
    }
  }
}
