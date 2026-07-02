import { useAuthHook } from "../hooks/useAuthHook";
import Button from "../components/ui/Button";
import { Logout } from "../api/authApi";
import { useNavigate } from "react-router";
import NoInfo from "../utils/NoInfo";
import "./pageStyles/profile.css";
import { useToggleAlertHook } from "../hooks/useToggle/useToggleAlert";
import { useGetPurchases } from "../hooks/useQueries/usePurchaseQueries";
import Loading from "../utils/Loading";
import PurchaseCard from "../components/purchase/PurchaseCard";
import type { IPurchase } from "../types/IPurchase";
import AiDisplay from "../components/ai/AiDisplay";

const Profile = () => {
    const { user, setUser, setAuth } = useAuthHook();
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

    const { isLoading, data: purchase } = useGetPurchases();

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
                        Number of products purchesed: {purchase?.length}
                    </em>

                    <Button
                        className="logout-button"
                        onClick={() => handleLogout()}
                        type="button">
                        Logout
                    </Button>
                </div>
                <AiDisplay mode="purchases" />
            </div>

            <div className="purchase-section">
                <h2 className="">Purchase</h2>
                <div className="purchase-container">
                    {
                        isLoading ? <Loading /> :
                            purchase?.length === 0 ?
                                < NoInfo noInfo="No purchase information available." />
                                :
                                purchase?.map((p: IPurchase) => (
                                    <PurchaseCard
                                        key={p.id}
                                        productTitle={p.productTitle}
                                        address={p.address}
                                        quantity={p.quantity}
                                        image={p.image}
                                        cardholderName={p.cardholderName}
                                        maskedCardNumber={p.maskedCardNumber}
                                        id={p.id}
                                        total={p.total}
                                        userName={p.userName}
                                        purchaseDate={p.purchaseDate}
                                    />
                                ))
                    }
                </div>
            </div>

        </div>
    );
};
export default Profile;