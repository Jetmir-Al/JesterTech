import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToggleNavbarUtilsHook } from "../../hooks/useToggle/useToggleNavbarUtils";
import Button from "../ui/Button";
import { useGetProductCategories } from "../../hooks/useQueries/useProductQueries";
import Loading from "../../utils/Loading";
import { useNavigate } from "react-router";


const SideBar = () => {
    const { openSideBarFunc } = useToggleNavbarUtilsHook();
    const navigate = useNavigate();
    const { data: Categories, isLoading } = useGetProductCategories();
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
                {
                    isLoading ? <Loading /> :
                        Categories?.map((c: string, index: number) => (
                            <Button
                                key={index}
                                className=""
                                type="button"
                                onClick={() => {
                                    navigate(`products?page=1&categories=${c}`);
                                    openSideBarFunc();
                                }}
                            >
                                {c}
                            </Button>
                        ))
                }
            </div>
        </aside>
    );
}

export default SideBar;