import './login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from '../ui/Button';
import { useToggleNavbarUtilsHook } from '../../hooks/useToggleNavbarUtils';
function LogIn() {

    const { toggleFormFunc, toggleDisplayFormFunc } = useToggleNavbarUtilsHook();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [badInfo, setBadInfo] = useState<boolean>(false);

      
    return (
        <>
            <div className="login grid" id="login-content">
                <form className="login__form grid" onSubmit={() => { } }>
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
                            className="login__button button"
                            onClick={() => { } }>
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