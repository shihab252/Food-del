import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets.js";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const deliveryFee = 80;

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));
  };

  const calculateCartTotals = () => {
    const subtotal = food_list.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        acc += item.price * cartItems[item._id];
      }
      return acc;
    }, 0);

    const total = subtotal === 0 ? 0 : subtotal + deliveryFee;
    return { subtotal, deliveryFee, total };
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    calculateCartTotals,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
