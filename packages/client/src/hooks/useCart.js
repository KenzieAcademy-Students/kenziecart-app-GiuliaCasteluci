import React, { useReducer, useContext, createContext } from "react";
import { useEffect } from "react";

const initialState = {
  cart: [],
  itemCount: 0,
  cartTotal: 0,
  appliedCoupon: '',
};

const cItemCount = (cartItems) => {
  let total = 0;
  cartItems.forEach((item) => (total += item.quantity));

  return total;
};

const calculateCartTotal = (cartItems) => {
  let total = 0;
  cartItems.map((item) => (total += item.price * item.quantity));
  return parseFloat(total.toFixed(2));
};

const reducer = (state, action) => {
  let nextCart = [...state.cart];
  switch (action.type) {
    case "ADD_ITEM":
      const existingIndex = nextCart.findIndex(
        (item) => item._id === action.payload._id
      );

      const numItemsToAdd = action.payload.quantity;

      if (existingIndex >= 0) {
        const newQuantity = parseInt(
          nextCart[existingIndex].quantity + numItemsToAdd
        );

        nextCart[existingIndex] = {
          ...action.payload,
          quantity: newQuantity,
        };
      } else {
        nextCart.push(action.payload);
      }

      localStorage.setItem("KenzieCart", JSON.stringify(nextCart));

      // const cartTotal = calculateCartTotal(nextCart);

      return {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount + numItemsToAdd,
        cartTotal: calculateCartTotal(nextCart),
      };
    case "REMOVE_ITEM":
      nextCart = nextCart
        .map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

        localStorage.setItem("KenzieCart", JSON.stringify(nextCart));

      return {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount > 0 ? state.itemCount - 1 : 0,
        cartTotal: calculateCartTotal(nextCart),
      };
    case "REMOVE_ALL_ITEMS":
      let quantity = state.cart.find((i) => i._id === action.payload).quantity;

      nextCart = state.cart.filter((item) => item._id !== action.payload)
      localStorage.setItem("KenzieCart", JSON.stringify(nextCart));
      return {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount > 0 ? state.itemCount - quantity : 0,
        cartTotal: 0,
      };
    case "RESET_CART":
      localStorage.setItem("KenzieCart", "[]")
      return { ...initialState };
    case "INIT_SAVED_CART":
      return {
        ...state,
        cart: action.payload,
        itemCount: cItemCount(action.payload),
        cartTotal: cItemCount(action.payload),
      };
    case "APPLY_COUPON":
      const price = calculateCartTotal(state.cart) 
      let discountPrice= price - (price * action.payload.discount)
      return {
        ...state,
        appliedCoupon: action.payload.code,
        cartTotal: discountPrice,
      }
    default:
      return state;
  }
};

const cartContext = createContext();

// Provider component that wraps your app and makes cart object ...
// ... available to any child component that calls useCart().
export function ProvideCart({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <cartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

// Hook for child components to get the cart object ...
// ... and re-render when it changes.
export const useCart = () => {
  return useContext(cartContext);
};

// Provider hook that creates cart object and handles state
const useProvideCart = () => {
  const { state, dispatch } = useCart();

  const addItem = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const removeAllItems = (id) => {
    dispatch({
      type: "REMOVE_ALL_ITEMS",
      payload: id,
    });
  };

  const resetCart = () => {
    dispatch({
      type: "RESET_CART",
    });
  };

  const isItemInCart = (id) => {
    return !!state.cart.find((item) => item._id === id);
  };

  const updateLocalCart = () => {
    localStorage.setItem("KenzieCart", JSON.stringify(state.cart));
  };

  const loadLocalCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("KenzieCart")) || false;

      dispatch({
        type: "INIT_SAVED_CART",
        payload: savedCart ? savedCart : []
      });
    
  };
  const applyCoupon = (coupon) => {
    dispatch({
      type: "APPLY_COUPON",
      payload: coupon
    })
  }
 
  //  Check for saved local cart on load and dispatch to set initial state
  useEffect(() => {
    loadLocalCart();
  },[] );

  useEffect(() => {
    if (state !== initialState) {
      updateLocalCart();
    }
  }, [state]);

  return {
    state,
    addItem,
    removeItem,
    removeAllItems,
    resetCart,
    isItemInCart,
    applyCoupon,
  };
};

export default useProvideCart;
