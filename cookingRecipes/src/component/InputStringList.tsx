import { useCallback, useState } from "react";
import "./InputStringList.css";

type Props = {
  value: string[];
  onChange: (newValue: string[]) => void;
};

const InputStringList = ({ value, onChange }: Props) => {
  const [inputText, setInputText] = useState("");

  const onAddItem = () => {
    if (inputText.trim()) {
      onChange([...value, inputText.trim()]);
      setInputText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAddItem();
    }
  };

  const handleRemoveItem = useCallback(
    (e: React.MouseEvent<HTMLParagraphElement>) => {
      onChange(value.filter((item) => item != e.currentTarget.textContent));
    },
    [onChange, value]
  );

  return (
    <div>
      <div>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Press Enter to add..."
        />
      </div>
      <div className="tags-container">
        {value.map((item, index) => (
          <p className="displayed-tag" key={index} onClick={handleRemoveItem}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InputStringList;
