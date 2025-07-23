import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id
    });

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1} :
            cartItem
        )
    }

    return [
        ...cartItems,
        {...productToAdd, quantity: 1}
    ]
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === cartItemToRemove.id;
    });

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => {
        if(cartItem.id === cartItemToRemove.id) {
            return {
                ...cartItem,
                quantity: cartItem.quantity - 1
            };
        } else {
            return cartItem;
        }
    });
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    showCartDropdown: false,
    setShowCartDropdown: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    useEffect(() => {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
    }, [cartItems]);

    useEffect(() => {
        const total = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
        setCartTotal(total);
    });

    return (
        <CartContext.Provider
            value={{
                showCartDropdown,
                setShowCartDropdown,
                cartItems,
                addItemToCart,
                cartCount,
                removeItemFromCart,
                clearItemFromCart,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}