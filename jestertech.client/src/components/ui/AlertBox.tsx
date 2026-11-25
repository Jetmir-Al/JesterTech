

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
import { useCallback, useEffect, useRef, useState } from "react";

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
    const [closing, setClosing] = useState(false);
    const closeTimer = useRef<number>(0);

    const dismiss = useCallback(() => {
        setClosing(true);
        closeTimer.current = window.setTimeout(() => setShowAlert(false), 280);
    }, [setShowAlert]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dismiss();
            }, 5000);
        return () => clearTimeout(timer); 
    }, [dismiss]);

    useEffect(() => () => clearTimeout(closeTimer.current), []);

    return (
        <div className="alert-container">
            <div className={`alert alert-${type}${closing ? ' is-closing' : ''}`} role="alert">
                <div className="alert-content">
                    <div className="alert-icon-wrapper">
                        <FontAwesomeIcon icon={iconMap[type]} className="alert-type-icon" />
                    </div>
                    <p>{message}</p>
                </div>
                <Button
                    type="button"
                    className="btn-close"
                    onClick={dismiss}
                >
                    <FontAwesomeIcon icon={faX} />
                </Button>
                <span className="alert-progress" aria-hidden="true"></span>
            </div>
        </div>
    );
};

export default AlertBox;