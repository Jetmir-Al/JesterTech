import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./auth.css";
import Button from '../ui/Button';
import { useToggleNavbarUtilsHook } from "../../hooks/useToggle/useToggleNavbarUtils";
import { useRegister } from "../../hooks/useQueries/useAuthQueries";

function SignUp() {
    const { toggleFormFunc, toggleDisplayFormFunc } = useToggleNavbarUtilsHook();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [badInfo, setBadInfo] = useState<boolean>(false);
    const { mutateAsync: registerFunc } = useRegister();

    const handleSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (name === "" || email === "" || password === "" || !emailRegex.test(email)) {
                setBadInfo(true);
                return;
            }
            await registerFunc({ name, email, password, role: "User" });
            toggleFormFunc();
        } catch {
            setBadInfo(true);
            return;
        }
    };

    return (
        <div className="signup-modal-overlay" id="signup-content">
            <div className="signup-modal-card">
                <button 
                    type="button" 
                    className="auth-close-btn" 
                    onClick={() => toggleDisplayFormFunc()}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className="auth-header">
                    <h3>Create Account</h3>
                    <p>Join EcomTech for fast & secure checkout</p>
                </div>

                <form className="signup__form" onSubmit={handleSignup}>
                    {badInfo && (
                        <div className="bad-info-banner">
                            <h5 className="badInfo">Invalid information provided!</h5>
                        </div>
                    )}

                    <div className="signup__group">
                        <div className="auth-field">
                            <label htmlFor="signup-name" className="signup__label">Full Name</label>
                            <div className="input-icon-wrapper">
                                <input 
                                    type="text" 
                                    placeholder="John Doe"
                                    id="signup-name" 
                                    className="signup__input"
                                    name="emri" 
                                    required
                                    onChange={(e) => setName(e.target.value)} 
                                />
                                <FontAwesomeIcon icon={faUser} className="input-side-icon" />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="signup-email" className="signup__label">Email Address</label>
                            <div className="input-icon-wrapper">
                                <input 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    id="signup-email"
                                    className="signup__input" 
                                    name="email" 
                                    required
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                <FontAwesomeIcon icon={faEnvelope} className="input-side-icon" />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="signup-pass" className="signup__label">Password</label>
                            <div className="input-icon-wrapper">
                                <input 
                                    type="password" 
                                    placeholder="At least 6 characters"
                                    id="signup-pass" 
                                    className="signup__input" 
                                    name="fjalekalimi"
                                    minLength={6}
                                    required
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                                <FontAwesomeIcon icon={faLock} className="input-side-icon" />
                            </div>
                        </div>
                   
                        <div className="auth-footer-actions">
                            <Button
                                type="submit"
                                className="signup__button button"
                            >
                                Register
                            </Button>
                            <span className="signup__login">
                                Already have an account? <span className="toggle-form" onClick={() => toggleFormFunc()}>Login</span>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;