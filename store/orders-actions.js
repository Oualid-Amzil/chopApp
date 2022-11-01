import axios from "axios";

import { uiActions } from "./ui";
import { ordersActions } from "./orders";

export const sendOrderData = (data) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: "https://rn-complete-guide-21372-default-rtdb.firebaseio.com/orders.json",
        data: {
          orders: data.orders,
        },
      });
    } catch (error) {
      dispatch(uiActions.error(error.message));
    }
  };
};

export const getOrderData = () => {
  return async (dispatch) => {
    dispatch(uiActions.isLoading(true));
    try {
      const response = await axios({
        method: "get",
        url: "https://rn-complete-guide-21372-default-rtdb.firebaseio.com/orders.json",
      });

      dispatch(
        ordersActions.replaceOrders({
          orders: response.data.orders || [],
        })
      );
      dispatch(uiActions.isLoading(false));
    } catch (error) {
      dispatch(uiActions.isLoading(false));
      dispatch(uiActions.error(error.message));
    }
  };
};
