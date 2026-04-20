"use client";

import CartProvider from "@/app/contexts/Cart";

const CartProviderWrapper = ({children}) => {
    return<CartProvider>{children}</CartProvider>
};

export default CartProviderWrapper;