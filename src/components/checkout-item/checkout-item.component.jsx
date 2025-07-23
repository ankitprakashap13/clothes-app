import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={() => removeItemFromCart(cartItem)}>&#10096;</span>
                <span className="value">{quantity}</span>
                <span className="arrow" onClick={() => addItemToCart(cartItem)}>&#10095;</span>
            </span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={() => clearItemFromCart(cartItem)}>&#10005;</span>
        </div>
    );
}

export default CheckoutItem;
