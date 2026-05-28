import { useToggleAlertHook } from "../../hooks/useToggleAlert";
import Button from "./Button";
import './alertBox.css';


interface AlertBoxProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

const AlertBox = ({ message, type = 'info' }: AlertBoxProps) => {
    const { setShowAlert } = useToggleAlertHook();

    return (
        <div className="alert-container">
            <div className={`alert alert-${type}`} role="alert"
                style={{ border: `1px solid var(--color-${type})`, backgroundColor: `var(--color-${type}-bg)` }}
            >
                <h4 className="alert-heading"
                    style={{borderBottom: `2px solid var(--color-${type})`} }
                >Alert</h4>
                <p>{message}</p>
                <Button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                        setShowAlert(false);
                    }}
                >
                    OK
                </Button>
            </div>
        </div>
    );
};

export default AlertBox;