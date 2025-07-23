import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    console.log("productToAdd", productToAdd);
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id
    });
    console.log("existingCartItem", existingCartItem);

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1} :
            cartItem
        )
    }

    console.log("existingCartItem", productToAdd);

    return [
        ...cartItems,
        {...productToAdd, quantity: 1}
    ]
};

export const CartContext = createContext({
    showCartDropdown: false,
    setShowCartDropdown: () => {},
    cartItems: [],
    addItemToCart: () => {}
});

export const CartProvider = ({ children }) => {
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    return (
        <CartContext.Provider
            value={{
                showCartDropdown,
                setShowCartDropdown,
                cartItems,
                addItemToCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}