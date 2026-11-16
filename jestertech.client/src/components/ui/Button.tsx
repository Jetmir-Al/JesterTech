import "./button.css";
import type { IButtonProps } from "../../types/IButton";
import { useFormStatus } from "react-dom";


function Button({ children, onClick, type, className, disabled, title
    }: IButtonProps) {

    const { pending } = useFormStatus();

    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={disabled || pending}
            title={className === "toggleAiPreference" ? "Answer Preferences" : title}
        >
            {children}
        </button>
    );
}

export default Button;