"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;

  if (cartProduct.size) {
    price += cartProduct.size.price;
  }

  if (cartProduct.ingredients?.length > 0) {
    for (const ingr of cartProduct.ingredients) {
      price += ingr.price;
    }
  }

  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  function savetoLS(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function clearCart() {
    setCartProducts([]);
    savetoLS([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts((prevProducts) => {
      const newCartProducts = prevProducts.filter(
        (product, indx) => indx !== indexToRemove
      );
      savetoLS(newCartProducts);
      return newCartProducts;
    });
    toast.success("Items removed successfully");
  }

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevState) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevState, cartProduct];
      savetoLS(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          clearCart,
          removeCartProduct,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
