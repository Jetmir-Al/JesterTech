import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToggleNavbarUtilsHook } from "../../hooks/useToggle/useToggleNavbarUtils";
import Button from "../ui/Button";


const SideBar = () => {
    const { openSideBarFunc } = useToggleNavbarUtilsHook();
    return (
        <aside className="sidebar-container">
            <div className="sidebar-close">
                <h4>JESTER TECH</h4>
                <Button
                    type="button"
                    onClick={() => openSideBarFunc()}
                    className="">
                    <FontAwesomeIcon icon={faXmark} className="icons" />
                </Button>
            </div>
            <div className="sidebar-show">
                <p>category</p>
                <p>category</p>
                <p>category</p>
                <p>category</p>
                <p>category</p>
                <p>category</p>
                <p>category</p>
            </div>
        </aside>
    );
}

export default SideBar;