import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './signup.css';
import { useState } from "react";
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
    }


    return (
        <div className="login signup grid" id="signup-content">
            <form className="signup__form grid" onSubmit={handleSignup}>
                <h3 className="signup__title">Sign Up</h3>
                {
                    badInfo &&
                    <div>
                        <h5 className="badInfo">Invalid information provided!</h5>
                    </div>
                }
                <div className="signup__group grid">
                    <div>
                        <label htmlFor="signup-name" className="signup__label">Name</label>
                        <input type="text" placeholder="Write your name"
                            id="signup-name" className="signup__input"
                            name="emri" required
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="signup-email" className="signup__label">Email</label>
                        <input type="email" placeholder="Write your email" id="signup-email"
                            className="signup__input" name="email" required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="signup-pass" className="signup__label">Password</label>
                        <input type="password" placeholder="Create a password"
                            id="signup-pass" className="signup__input" name="fjalekalimi"
                            minLength={6}
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
               
                    <div>

                        <span className="signup__login">
                            Already have an account? <a onClick={() => toggleFormFunc()}>Login</a>
                        </span>
                        <Button
                            type="submit"
                            className="signup__button button"
                            onClick={() => { }}>
                            Signup
                        </Button>
                    </div>
                </div>
            </form>
            <Button 
                className=""
                type="button"
                onClick={() => toggleDisplayFormFunc()}>
                <FontAwesomeIcon icon={faXmark} className="ri-close-line signup__close" />
            </Button>
        </div>
    );
}
export default SignUp;