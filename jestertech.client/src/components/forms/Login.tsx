import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./auth.css";
import Button from '../ui/Button';
import { useToggleNavbarUtilsHook } from '../../hooks/useToggle/useToggleNavbarUtils';
import { useLogin } from '../../hooks/useQueries/useAuthQueries';
import { useAuthHook } from '../../hooks/useAuthHook';
import { useToggleAlertHook } from '../../hooks/useToggle/useToggleAlert';
import { Link } from "react-router";

function LogIn() {
    const { toggleFormFunc, toggleDisplayFormFunc } = useToggleNavbarUtilsHook();
    const { setMessage, setType, setShowAlert } = useToggleAlertHook();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [badInfo, setBadInfo] = useState<boolean>(false);
    const { setAuth, setUser } = useAuthHook();
    const { mutateAsync: loginFunc } = useLogin();

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email === "" || password === "" || !emailRegex.test(email)) {
                setBadInfo(true);
                return;
            }
            const result = await loginFunc({ email, password });
            if (!result) {
                setBadInfo(true);
                return;
            }
            if (result) {
                setAuth(true);
                setUser(result);
                toggleDisplayFormFunc();
                setMessage("Login successful!");
                setType("success");
                setShowAlert(true);
            }
        } catch {
            setBadInfo(true);
            return;
        }
    };

    return (
        <div className="login-modal-overlay" id="login-content">
            <div className="login-modal-card">
                <button 
                    type="button" 
                    className="auth-close-btn" 
                    onClick={() => toggleDisplayFormFunc()}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className="auth-header">
                    <h3>Welcome Back</h3>
                    <p>Access your EcomTech account & orders</p>
                </div>

                <form className="login__form" onSubmit={handleLogin}>
                    <div className="login__group">
                        <div className="auth-field">
                            <label htmlFor="login-email" className="login__label">Email Address</label>
                            <div className="input-icon-wrapper">
                                <input 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    id="login-email"
                                    className="login__input" 
                                    name="email" 
                                    required
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                <FontAwesomeIcon icon={faEnvelope} className="input-side-icon" />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="login-pass" className="login__label">Password</label>
                            <div className="input-icon-wrapper">
                                <input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    id="login-pass"
                                    className="login__input" 
                                    name="password" 
                                    required
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                                <FontAwesomeIcon icon={faLock} className="input-side-icon" />
                            </div>
                        </div>
                    </div>

                    {badInfo && (
                        <div className="bad-info-banner">
                            <h5 className="badInfo">Email or password is incorrect!</h5>
                        </div>
                    )}

                    <div className="auth-footer-actions">
                        <Button
                            type="submit"
                            className="login__button button"
                        >
                            Sign In
                        </Button>
                        <span className="login__signup">
                            Don't have an account? <span className="toggle-form" onClick={() => toggleFormFunc()}>Sign up</span>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;