import { faBoxOpen, faCreditCard, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import { useState } from "react";
import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";
import { useCreatePurchase } from "../../hooks/useQueries/usePurchaseQueries";
import { useCartHook } from "../../hooks/useCartHook";
import type { PurchaseFormProps } from "../../types/IPurchase";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons/faShieldHalved";

function PurchaseForm({ setBuyForm, Quantity, id, productName, productPrice }: PurchaseFormProps) {

    const [CardholderName, setCardName] = useState<string>("");
    const [CardNumber, setCardNum] = useState<string>("0");
    const [cardPsw, setCardPsw] = useState<string>("");
    const [step, setStep] = useState<number>(1);;
    const [address, setAddress] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);


    const { setMessage, setShowAlert, setType } = useToggleAlertHook();
    const { mutateAsync: createPurchase, isPending: pendingPurchase} = useCreatePurchase();
    const { removeCartItem } = useCartHook();


    const handleBuySubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setBuyForm();
            setShowAlert(true);
            setType("info");
            setMessage("Procesing your purchase...!");
            await createPurchase(
                {   
                    productId: id, 
                    CardholderName, 
                    CardNumber, 
                    quantity, 
                    address 
                }
            );
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

    const subtotal = productPrice * quantity;

    return (
        <div className="purchase-modal-overlay">
            <div className="purchase-modal-card">
                <Button
                    className="purchase-close-btn" 
                    onClick={() => setBuyForm()} 
                    type="button">
                    <FontAwesomeIcon icon={faXmark} />
                </Button>

                <div className="purchase-header">
                    <h2>Checkout</h2>
                    <div className="purchase-steps-indicator">
                        <span className={`step-badge ${step === 1 ? 'active' : 'completed'}`}>1. Quantity & Summary</span>
                        <span className="step-divider">/</span>
                        <span className={`step-badge ${step === 2 ? 'active' : ''}`}>2. Shipping & Payment</span>
                    </div>
                </div>

                <form className="purchase-form" onSubmit={handleBuySubmit}>
                    {step === 1 && (
                        <div className="purchase-step-content">
                            <div className="product-summary-box">
                                <div className="summary-icon">
                                    <FontAwesomeIcon icon={faBoxOpen} />
                                </div>
                                <div className="summary-details">
                                    <h4>{productName}</h4>
                                    <p className="summary-unit-price">${productPrice.toFixed(2)} per unit</p>
                                </div>
                            </div>

                            <div className="purchase-input-group">
                                <label className="purchase-label">Select Quantity:</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max={Quantity} 
                                    className="purchase-input" 
                                    required
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} 
                                />
                                <span className="input-hint">Available stock: {Quantity} items</span>
                            </div>

                            <div className="order-total-preview">
                                <span>Total Amount:</span>
                                <span className="total-price-tag">${subtotal.toFixed(2)}</span>
                            </div>

                            <Button
                                type="button"
                                className="purchase-action-btn"
                                onClick={() => setStep(2)}
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="purchase-step-content">
                            <div className="purchase-input-group">
                                <label className="purchase-label">Shipping Address:</label>
                                <input 
                                    type="text" 
                                    placeholder="Street, City, Zip Code" 
                                    className="purchase-input" 
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="purchase-input-group">
                                <label className="purchase-label">Cardholder Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Name on card" 
                                    className="purchase-input" 
                                    required
                                    value={CardholderName}
                                    onChange={(e) => setCardName(e.target.value)} 
                                />
                            </div>

                            <div className="purchase-input-group">
                                <label className="purchase-label">Card Number:</label>
                                <div className="input-with-icon">
                                    <input 
                                        type="text" 
                                        placeholder="4532 •••• •••• ••••" 
                                        className="purchase-input" 
                                        required
                                        maxLength={16}
                                        value={CardNumber}
                                        onChange={(e) => setCardNum(e.target.value)} 
                                    />
                                    <FontAwesomeIcon icon={faCreditCard} className="field-icon" />
                                </div>
                            </div>

                            <div className="purchase-input-group">
                                <label className="purchase-label">Security Code / PIN:</label>
                                <input 
                                    type="password" 
                                    placeholder="CVV / Password" 
                                    className="purchase-input" 
                                    required
                                    maxLength={4}
                                    value={cardPsw}
                                    onChange={(e) => setCardPsw(e.target.value)}
                                />
                            </div>

                            <div className="purchase-form-actions">
                                <Button
                                    type="button"
                                    className="purchase-back-btn"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={pendingPurchase}
                                    className="purchase-action-btn"
                                >
                                    <FontAwesomeIcon icon={faShieldHalved} /> Confirm Purchase (${subtotal.toFixed(2)})
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PurchaseForm;