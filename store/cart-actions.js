import axios from "axios";

import { uiActions } from "./ui";
import { cartActions } from "./cart";

export const sendCartData = (data) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: "https://rn-complete-guide-21372-default-rtdb.firebaseio.com/cart.json",
        data: {
          cartItems: data.cartItems,
          totalQuantity: data.totalQuantity,
          totalAmount: data.totalAmount,
        },
      });
    } catch (error) {
      dispatch(uiActions.error(error.message));
    }
  };
};

export const getCartData = () => {
  return async (dispatch) => {
    dispatch(uiActions.isLoading(true));
    try {
      const response = await axios({
        method: "get",
        url: "https://rn-complete-guide-21372-default-rtdb.firebaseio.com/cart.json",
      });

      dispatch(
        cartActions.replaceItemCart({
          cartItems: response.data.cartItems ? response.data.cartItems : [],
          totalAmount: response.data.totalAmount || 0,
          totalQuantity: response.data.totalQuantity || 0,
        })
      );
      dispatch(uiActions.isLoading(false));
    } catch (error) {
      dispatch(uiActions.isLoading(false));
      dispatch(uiActions.error(error.message));
    }
  };
};
