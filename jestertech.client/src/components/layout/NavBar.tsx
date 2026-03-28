import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons/faMoon";
import { useToggleModeHook } from "../../hooks/useToggleModeHook";
import Button from "../ui/Button";

const NavBar = () => {
    const { toggleMode } = useToggleModeHook();
    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <FontAwesomeIcon icon={faBars} className="icons" />
                <h5>JESTER TECH</h5>
            </div>
            <div className="navbar-right">
                <Button
                    type="button"
                    className=""
                    onClick={() => toggleMode()}>
                <FontAwesomeIcon icon={faMoon} className="icons" />
                </Button>
                <Button
                    type="button"
                    className=""
                    onClick={() => { } }>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="icons" />
                </Button>   
                <Button
                    type="button"
                    className=""
                    onClick={() => { } }>
                <FontAwesomeIcon icon={faCartShopping} className="icons" />
                </Button>
                <Button
                    type="button"
                    className=""
                    onClick={() => { } }>
                <FontAwesomeIcon icon={faUser} className="icons" />
                </Button>
            </div>
        </div>
    );
}

export default NavBar;