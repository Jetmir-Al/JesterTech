import { getImageUrl } from "../../api/productApi";
import type { IPurchase } from "../../types/IPurchase";
import "./purchase.css";

function PurchaseCard({ productTitle, purchaseDate, quantity, image, address, cardholderName, maskedCardNumber, total, id, userName }: IPurchase) {
    return (
        <div className="purchase-card">
            <img src={getImageUrl(image)} alt={productTitle} />
            <div className="purchase-content">
                <h5>{productTitle} ~ {quantity}</h5>
                <address>{address}</address>
                <p>{new Date(purchaseDate).toUTCString()}</p>
                <p>Total: {total}€</p>
            </div>
      </div>
  );
}

export default PurchaseCard;