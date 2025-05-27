import "./EditDeleteButtons.css";

type Props = {
  onEdit: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  show?: boolean;
  "data-index"?: number;
};

const EditDeleteButtons = ({
  onEdit,
  onDelete,
  show = false,
  "data-index": dataIndex,
}: Props) => {
  const dataAttributes =
    dataIndex !== undefined ? { "data-index": dataIndex } : {};

  return (
    <>
      {show && (
        <div className="actions">
          <button onClick={onEdit} {...dataAttributes}>
            ✏️
          </button>
          <button onClick={onDelete} {...dataAttributes}>
            🗑️
          </button>
        </div>
      )}
    </>
  );
};

export default EditDeleteButtons;
