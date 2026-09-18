import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCheckCircle, 
    faTimesCircle, 
    faExclamationTriangle, 
    faInfoCircle 
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
                <div className="alert-icon-wrapper">
                    <FontAwesomeIcon icon={iconMap[type]} className="alert-type-icon" />
                </div>
                <div className="alert-content">
                    <h4 className="alert-heading">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h4>
                    <p>{message}</p>
                </div>
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