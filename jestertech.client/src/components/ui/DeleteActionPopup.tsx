import Button from "./Button";
import "./deleteActionPopup.css";
interface IDeleteActionPopupProps {
  title: string;
  description: string;
  onAccept: () => Promise<void>;
  onClose: () => void;
}

function DeleteActionPopup({ title, description, onAccept, onClose }: IDeleteActionPopupProps) {
  return (
    <div className="del-container">
      <div className="del-form">
        <div className="del-header">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <div className="del-actions">
          <Button
            type="button"
            className="del-btn"
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            className="del-btn"
            type="button"
            onClick={() => onAccept()}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteActionPopup;