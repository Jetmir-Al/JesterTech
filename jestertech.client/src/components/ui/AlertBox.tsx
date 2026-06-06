import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";
import Button from "./Button";
import './alertBox.css';


interface AlertBoxProps {
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

const AlertBox = ({ message, type = 'info' }: AlertBoxProps) => {
    const { setShowAlert } = useToggleAlertHook();

    return (
        <div className="alert-container">
            <div className={`alert alert-${type}`} role="alert"
            >
                <h4 className="alert-heading"
                >Alert</h4>
                <p>{message}</p>
                <Button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAlert(false)}
                >
                    OK
                </Button>
            </div>
        </div>
    );
};

export default AlertBox;