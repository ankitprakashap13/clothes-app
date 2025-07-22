import { createContext, useState } from "react";

export const CartContext = createContext({
    showCartDropdown: false,
    setShowCartDropdown: () => {}
});

export const CartProvider = ({ children }) => {
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    return (
        <CartContext.Provider
            value={{
                showCartDropdown,
                setShowCartDropdown
            }}
        >
            {children}
        </CartContext.Provider>
    );
}