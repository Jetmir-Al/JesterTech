import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import { useState } from "react";
import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";
import { useCreatePurchase } from "../../hooks/useQueries/usePurchaseQueries";
import { useCartHook } from "../../hooks/useCartHook";

function PurchaseForm({ setBuyForm, Quantity, id }: { setBuyForm: () => void, Quantity: number, id: number }) {

    const [CardholderName, setCardName] = useState<string>("");
    const [CardNumber, setCardNum] = useState<string>("0");
    const [address, setAddress] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const { setMessage, setShowAlert, setType } = useToggleAlertHook();
    const { mutateAsync: createPurchase } = useCreatePurchase();
    const { removeCartItem } = useCartHook();
    const handleBuySubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setBuyForm();
            setShowAlert(true);
            setType("info");
            setMessage("Procesing your purchase...!");
            await createPurchase({ productId: id, CardholderName, CardNumber, quantity, address });
        } catch {
            setBuyForm();
            setShowAlert(true);
            setType("error");
            setMessage("Could not process your purchase! Try again later!");
        } finally {
            setType("success");
            setMessage("Product has been purchased! You can view details on your profile!");
            removeCartItem(id);
        }
    }


    return (
        <div id="login-content" className="login grid">
            <form className="login__form"
                onSubmit={handleBuySubmit}>
                <h3 className="login__title">Buy</h3>

                <div className="login__group">

                    <div className="pruchaseInputs">
                        <label className="login__label">Name:</label>
                        <input type="text" placeholder="Write the card holder's name!" className="login__input" name="cardName" required
                            onChange={(e) => setCardName(e.target.value)} />
                    </div>

                    <div className="pruchaseInputs">
                        <label className="login__label">Card number:</label>
                        <input type="number" placeholder="Enter your card number!" className="login__input" name="cardNumber" required
                            maxLength={16} minLength={13}
                            onChange={(e) => setCardNum(String(e.target.value))} />
                    </div>

                    <div className="pruchaseInputs">
                        <label className="login__label">Password:</label>
                        <input type="password" placeholder="Enter your card password!"
                            className="login__input" name="cardPsw" required
                            minLength={4}
                        />
                    </div>
                    <div className="pruchaseInputs">
                        <label className="login__label">Address:</label>
                        <input type="text" placeholder="Enter your address!" className="login__input" name="cardPsw" required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="pruchaseInputs">
                        <label className="login__label">Quantity:</label>
                        <input type="number" min="1" max={Quantity} className="login__input" required
                            placeholder="Enter number of items to buy!"
                            onChange={(e) => setQuantity(Number(e.target.value))} />
                    </div>
                </div>

                <div>
                    <br />
                    <Button
                        type="submit"
                        className="login__button">
                        Buy
                    </Button>
                </div>
            </form>
            <FontAwesomeIcon icon={faXmark} className="signup__close ri-close-line"
                onClick={() => setBuyForm()}
            />
        </div>
    );
}

export default PurchaseForm;