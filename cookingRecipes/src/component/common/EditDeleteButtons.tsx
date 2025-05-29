import "./EditDeleteButtons.css";

type Props = {
  onEdit: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  "data-index"?: number;
};

const EditDeleteButtons = ({
  onEdit,
  onDelete,
  "data-index": dataIndex,
}: Props) => {
  const dataAttributes =
    dataIndex !== undefined ? { "data-index": dataIndex } : {};

  return (
    <>
      <div className="actions">
        <button onClick={onEdit} {...dataAttributes}>
          ✏️
        </button>
        <button onClick={onDelete} {...dataAttributes}>
          🗑️
        </button>
      </div>
    </>
  );
};

export default EditDeleteButtons;
