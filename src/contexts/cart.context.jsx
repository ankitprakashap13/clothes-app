import { createContext, useEffect, useState } from "react";

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
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    useEffect(() => {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
    }, [cartItems])

    return (
        <CartContext.Provider
            value={{
                showCartDropdown,
                setShowCartDropdown,
                cartItems,
                addItemToCart,
                cartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
}