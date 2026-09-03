import "./button.css";
import type { IButtonProps } from "../../types/IButton";


function Button({ children, onClick, type, className, disabled }: IButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={disabled}
            title={className === "toggleAiPreference" ? "Answer Preferences" : ""}
        >
            {children}
        </button>
    );
}

export default Button;