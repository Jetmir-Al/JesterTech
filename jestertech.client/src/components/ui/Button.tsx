import "./button.css";
import type { IButtonProps } from "../../types/IButton";


function Button({ children, onClick, type, className }: IButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            title={className === "toggleAiPreference" ? "Answer Preferences" : ""}
        >
            {children}
        </button>
    );
}

export default Button;