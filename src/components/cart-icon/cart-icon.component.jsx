import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles.jsx";

const CartIcon = () => {
    const { showCartDropdown, setShowCartDropdown, cartCount } = useContext(CartContext);

    return (
        <CartIconContainer
            onClick={() => setShowCartDropdown(!showCartDropdown)}
        >
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;