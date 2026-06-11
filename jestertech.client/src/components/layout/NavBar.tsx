import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faCartShopping, faUser, faXmark, faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons/faMoon";
import { useToggleModeHook } from "../../hooks/useToggle/useToggleModeHook";
import { useToggleNavbarUtilsHook } from "../../hooks/useToggle/useToggleNavbarUtils";
import Button from "../ui/Button";
import LogIn from "../forms/Login";
import SignUp from "../forms/Signup";
import { useNavigate } from "react-router";
import SideBar from "./SideBar";
import { useAuthHook } from "../../hooks/useAuthHook";
import { faUserGear } from "@fortawesome/free-solid-svg-icons/faUserGear";

const NavBar = () => {
    const { toggleMode, mode } = useToggleModeHook();
    const { user, authenticated } = useAuthHook();
    const { toggleDisplayForm, openSideBar, openSideBarFunc, openSearchBarFunc, openSearchBar, toggleDisplayFormFunc, toggleForm } = useToggleNavbarUtilsHook();
    const navigate = useNavigate();

    return (
        <>
        <nav className="navbar-container">
                <div className="navbar-left">
                    <Button
                        type="button"
                        onClick={() => openSideBarFunc()}
                        className=""
                    >
                        <FontAwesomeIcon icon={faBars} className="icons" />
                    </Button>

                    <Button
                        className="navbar-title"
                        type="button"
                        onClick={() => navigate("/")}                    >
                        JESTER TECH
                    </Button>
                </div>
                <div className="navbar-right">
                
                <Button
                    type="button"
                    className=""
                    onClick={toggleMode}>
                    {
                        mode ?
                            <FontAwesomeIcon icon={faSun} className="icons" /> :
                            <FontAwesomeIcon icon={faMoon} className="icons" />
                    }
                </Button>
                
                <Button
                    type="button"
                        className=""
                        onClick={() => openSearchBarFunc()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="icons" />
                </Button>   
                    <Button
                        type="button"
                        className=""
                        onClick={() => navigate("/cart")}>
                        <FontAwesomeIcon icon={faCartShopping} className="icons" />
                    </Button>
                    {authenticated && user ?
                        <Button
                            type="button"
                            className=""
                            onClick={() => navigate("/profile")}>
                            <FontAwesomeIcon icon={faUserGear} className="icons" />
                        </Button>
                        : <Button
                            type="button"
                            className=""
                            onClick={() => toggleDisplayFormFunc()}>
                            <FontAwesomeIcon icon={faUser} className="icons" />
                        </Button>
                    }
            </div>
            </nav>
            {
                    toggleDisplayForm && (
                        toggleForm ?
                            <LogIn /> :
                            <SignUp />
                    )
                }
            {
                openSearchBar &&
                <form className="searchbar-container" onSubmit={
                        (e: React.SubmitEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            navigate(`/products?search=${formData.get("search")}`);
                            openSearchBarFunc();
                        }
                    }>
                    <input
                            type="text"
                            name="search"
                        placeholder="Search for products, brands and more..."
                        className="searchbar-input" />
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="ri-close-line signup__close"
                        onClick={() => openSearchBarFunc()}
                    /> 
                </form>
            }

            {
                openSideBar && <SideBar />
            }
        </>
    );
}

export default NavBar;