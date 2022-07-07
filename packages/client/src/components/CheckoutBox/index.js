import { Button } from "react-bootstrap";
import "./CheckoutBox.scss";

const CheckoutBox = ({ handleShopping, handleCheckout }) => {
  return (
    <div className="easy-checkout">
      <div className="checkout-actions">
        <Button
          className="mr-2"
          variant="outline-primary"
          onClick={() => handleShopping()}
        >
          Continue shopping
        </Button>
        <Button variant="outline-primary" onClick={() => handleCheckout()}>
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default CheckoutBox;
