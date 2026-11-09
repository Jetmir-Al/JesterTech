import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToggleNavbarUtilsHook } from "../../hooks/useToggle/useToggleNavbarUtils";
import Button from "../ui/Button";
import { useGetProductCategories } from "../../hooks/useQueries/useProductQueries";
import Loading from "../../utils/Loading";
import { useNavigate } from "react-router";
import { useRef, useEffect, useState } from "react";
import { NavigationSideBar } from "../../types/sidebarTypes";


const SideBar = () => {
    const { openSideBarFunc, openSideBar } = useToggleNavbarUtilsHook();
    const { data: Categories, isLoading } = useGetProductCategories();
    const [tabs, setTabs] = useState<"Tabs" | "Explore">("Tabs");
    const navigate = useNavigate();
    const sideBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
                openSideBarFunc();
            }
        };

        if (openSideBar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSideBarFunc, openSideBar]);

    return (
        <div className="sidebar-container" ref={sideBarRef}>
            <div className="sidebar-close">
                <h4>ECOM TECH</h4>
                <Button
                    type="button"
                    onClick={() => openSideBarFunc()}
                    className="">
                    <FontAwesomeIcon icon={faXmark} className="icons" />
                </Button>
            </div>
            <div className="tabs-container">
                <Button
                    className={tabs === "Tabs" ? "active-tab" : ""}
                    type="button"
                    onClick={() => setTabs("Tabs")}
                >
                    Navigation
                </Button>
                <Button
                    className={tabs === "Explore" ? "active-tab" : ""}
                    type="button"
                    onClick={() => setTabs("Explore")}
                >
                    Explore
                </Button>
            </div>
            {
                tabs === "Tabs" &&
                <div className="sidebar-navigations">
                    <div className="tab-group">
                        <p>Overview</p>
                        {
                            NavigationSideBar[0].map((p, index) => (
                                <Button
                                    className=""
                                    onClick={() => navigate(p.navigate)}
                                    type="button"
                                    key={index}>
                                    <FontAwesomeIcon icon={p.icon} />
                                    {p.label}
                                </Button>
                            ))
                        }
                    </div>
                    <div className="tab-group">
                        <p>Shopping</p>
                        {
                            NavigationSideBar[1].map((p, index) => (
                                <Button
                                    className=""
                                    onClick={() => navigate(p.navigate)}
                                    type="button"
                                    key={index}>
                                    <FontAwesomeIcon icon={p.icon} />
                                    {p.label}
                                </Button>
                            ))
                        }
                    </div>
                    <div className="tab-group">
                        <p>My Account</p>
                        {
                            NavigationSideBar[2].map((p, index) => (
                                <Button
                                    className=""
                                    onClick={() => navigate(p.navigate)}
                                    type="button"
                                    key={index}>
                                    <FontAwesomeIcon icon={p.icon} />
                                    {p.label}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            }
            {
                tabs === "Explore" &&
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
            }

        </div>
    );
}

export default SideBar;