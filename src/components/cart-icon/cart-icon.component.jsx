import "./cart-icon.styles.scss";
import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
    const { showCartDropdown, setShowCartDropdown, cartCount } = useContext(CartContext);

    return (
        <div
            className="cart-icon-container"
            onClick={() => setShowCartDropdown(!showCartDropdown)}
        >
            <ShoppingIcon className='shopping-icon' />
            <span className="item-count">{cartCount}</span>
        </div>
    );
}

export default CartIcon;