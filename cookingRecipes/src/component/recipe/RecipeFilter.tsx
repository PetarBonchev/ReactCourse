import { useCallback } from "react";
import InputStringList from "../InputStringList";
import "./RecipeFilter.css";

type Props = {
  tagFilter: string[];
  onTagFilterChange: (tags: string[]) => void;
  authorFilter: string;
  onAuthorFilterChange: (newAuthor: string) => void;
};

const RecipeFilter = ({
  tagFilter,
  onTagFilterChange,
  authorFilter,
  onAuthorFilterChange,
}: Props) => {
  const handleAuthorFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onAuthorFilterChange(event.target.value);
    },
    [onAuthorFilterChange]
  );

  return (
    <div className="filter-container">
      <div className="form-group">
        <label>Tags:</label>
        <InputStringList value={tagFilter} onChange={onTagFilterChange} />
      </div>
      <div className="form-group">
        <label>Author:</label>
        <input value={authorFilter} onChange={handleAuthorFilterChange} />
      </div>
    </div>
  );
};

export default RecipeFilter;
