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
import { useSearchParams } from "react-router";

const Profile = () => {
    const { user, setUser, setAuth } = useAuthHook();
    const { setMessage, setShowAlert, setType } = useToggleAlertHook();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

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

    const { isLoading, data: purchase } = useGetPurchases({
        params: Object.fromEntries(searchParams)
    });


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
                    <i>Nr. of purchases: {purchase?.totalPurchases}</i>
                    <Button
                        className="logout-button"
                        onClick={() => handleLogout()}
                        type="button">
                        Logout
                    </Button>
                </div>
            </div>

            <div className="purchase-section">
                <h2 className="">Purchase</h2>
                <div className="purchase-container">
                    {
                        isLoading ? <Loading /> :
                            purchase?.data.length === 0 ?
                                < NoInfo noInfo="No purchase information available." />
                                :
                                purchase?.data.map((p: IPurchase) => (
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
                    <div className="pageNumbers-container">
                        {
                            Array.from({ length: purchase?.totalPages || 1 }, (_, index) => (
                                <Button
                                    key={index}
                                    type="button"
                                    className={`pageLink`}
                                    onClick={() => setSearchParams(prev => ({ ...prev, page: (index + 1).toString() }))}
                                >
                                    {index + 1}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>
            <AiDisplay mode="purchases" />
        </div>
    );
};
export default Profile;