import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
    faInfoCircle,
    faX
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import './alertBox.css';

interface AlertBoxProps {
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

const iconMap = {
    success: faCheckCircle,
    error: faTimesCircle,
    warning: faExclamationTriangle,
    info: faInfoCircle,
};

const AlertBox = ({ message, type = 'info' }: AlertBoxProps) => {
    const { setShowAlert } = useToggleAlertHook();

    return (
        <div className="alert-container">
            <div className={`alert alert-${type}`} role="alert">
                <div className="alert-content">
                    <div className="alert-icon-wrapper">
                        <FontAwesomeIcon icon={iconMap[type]} className="alert-type-icon" />
                    </div>
                    <p>{message}</p>
                </div>
                <Button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAlert(false)}
                >
                    <FontAwesomeIcon icon={faX} />
                </Button>
            </div>
        </div>
    );
};

export default AlertBox;