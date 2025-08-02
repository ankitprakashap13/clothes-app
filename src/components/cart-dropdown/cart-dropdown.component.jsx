import CartItem from "../cart-item/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import { useNavigate } from "react-router";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";


const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate("/checkout");
    };

    console.log(cartItems);
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?
                    cartItems.map((item) => {
                        return <CartItem key={item.id} cartItem={item} />
                    }) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckout} to="/checkout">Go to checkout</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;