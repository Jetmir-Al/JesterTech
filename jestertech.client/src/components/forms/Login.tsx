import './login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from '../ui/Button';
import { useToggleNavbarUtilsHook } from '../../hooks/useToggle/useToggleNavbarUtils';
import { useLogin } from '../../hooks/useQueries/useAuthQueries';
import { useAuthHook } from '../../hooks/useAuthHook';
import { useToggleAlertHook } from '../../hooks/useToggle/useToggleAlert';
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
    }

    return (
        <>
            <div className="login grid" id="login-content">
                <form className="login__form grid" onSubmit={handleLogin}>
                    <h3 className="login__title">Login</h3>

                    <div className="login__group grid">

                        <div>
                            <label htmlFor="login-email" className="login__label">Email</label>
                            <input type="email" placeholder="Write your email" id="login-email"
                                className="login__input" name="email" required
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="login-pass" className="login__label">Password</label>
                            <input type="password" placeholder="Enter your password" id="login-pass"
                                className="login__input" name="password" required
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    {
                        badInfo &&
                        <div>
                            <h5 className="badInfo">Email or password is wrong!</h5>
                        </div>
                    }
                    <div>
                        <span className="login__signup">
                            You do not have an account? <a onClick={() => toggleFormFunc()}>Sign up</a>
                        </span>
                        <br />
                        <Button
                            type="submit"
                            className="login__button button">
                            Login
                        </Button>
                    </div>
                </form>

                <FontAwesomeIcon
                    icon={faXmark}
                    className="ri-close-line signup__close"
                    onClick={() => toggleDisplayFormFunc()}
                />
            </div>
        </>
    );
}
export default LogIn;