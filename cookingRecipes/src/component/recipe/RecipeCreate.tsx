import { useEffect, useState } from "react";
import type { IdType, Optional } from "../../common/commonTypes";
import { Recipe } from "../../model/recipe";
import type { UserAccount } from "../../model/user";
import InputStringList from "../InputStringList";
import { Link, useParams } from "react-router-dom";

type Props = {
  onSubmit: (recipe: Recipe) => void;
  loggedUser: Optional<UserAccount>;
  getRecipe: (id: IdType) => Optional<Recipe>;
};

const emptyForm = {
  name: "",
  shortDescription: "",
  time: -1,
  photoUrl: "",
  longDescription: "",
};

const RecipeCreate = ({ onSubmit, loggedUser, getRecipe }: Props) => {
  const [formData, setFormData] = useState(emptyForm);
  const [tags, setTags] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  const recipeData = getRecipe(id as IdType);

  useEffect(() => {
    if (recipeData) {
      setFormData({
        name: recipeData.name || "",
        shortDescription: recipeData.shortDescription || "",
        time: recipeData.cookingDuration || -1,
        photoUrl: recipeData.photoUrl || "",
        longDescription: recipeData.fullDescription || "",
      });
      setTags(recipeData.tags || []);
      setProducts(recipeData.productsUsed || []);
    } else {
      setFormData(emptyForm);
      setTags([]);
      setProducts([]);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "time" ? Number(value) : value,
    }));
  };

  const onSubmitData = () => {
    try {
      const userId = loggedUser ? loggedUser.id : "";
      const recipe = new Recipe(
        userId,
        formData.name,
        formData.shortDescription,
        formData.time,
        products,
        formData.photoUrl,
        formData.longDescription,
        tags
      );
      recipe.id = recipeData ? recipeData.id : recipe.id;

      setErrorMessage("");
      setFormData(emptyForm);
      setTags([]);
      setProducts([]);

      onSubmit(recipe);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="user-form-container">
      <h2>Create recipe</h2>

      <div className="form-group">
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Time in minutes:</label>
        <input
          name="time"
          value={formData.time == -1 ? "" : formData.time}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Tags:</label>
        <InputStringList value={tags} onChange={setTags} />
      </div>

      <div className="form-group">
        <label>Short description:</label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Products:</label>
        <InputStringList value={products} onChange={setProducts} />
      </div>

      <div className="form-group">
        <label>Photo URL:</label>
        <input
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Long description:</label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleInputChange}
        />
      </div>

      <button className="submit-button" onClick={onSubmitData}>
        Submit
      </button>

      <Link to={"/"}>
        <button className="submit-button">Cancel</button>
      </Link>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default RecipeCreate;
