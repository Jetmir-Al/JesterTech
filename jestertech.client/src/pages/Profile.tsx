import { useState } from "react";
import { useAuthHook } from "../hooks/useAuthHook";
import Button from "../components/ui/Button";
import { Logout } from "../api/authApi";
import { useNavigate } from "react-router";
import NoInfo from "../utils/NoInfo";
import "./pageStyles/profile.css";
import { useToggleAlertHook } from "../hooks/useToggle/useToggleAlert";

const Profile = () => {
    const { user, setUser, setAuth } = useAuthHook();
    const [purchase, setPurchase] = useState([]);
    const { setMessage, setShowAlert, setType } = useToggleAlertHook();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await Logout();
            navigate("/");
            setUser(null);
            setAuth(false);
        }
        catch {
            setMessage("Logout failed. Please try again.");
            setType("error");
            setShowAlert(true);
        }
    }

    return (
        <div className="userPage-container">
            <div className="userInfo">
                <div className="userCard">

                    <h2>
                        Username: {user && user.name}
                    </h2>
                    <h2>
                        Email: {user && user.email}
                    </h2>
                    <em>
                        Number of products purchesed: {purchase.length}
                    </em>

                    <Button
                        className="logout-button"
                        onClick={() => handleLogout()}
                        type="button">
                        Logout
                    </Button>
                </div>
            </div>

            <div className="">
                <h2 className="">Purchase</h2>
                <div className="">
                    {
                        purchase.length > 0 ?
                            purchase.map(() => (
                                <>
                                </>
                            ))
                            :
                            < NoInfo noInfo="No purchase information available." />
                    }
                </div>
            </div>

        </div>
    );
};
export default Profile;