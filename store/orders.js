import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  changed: false,
};

const ordersSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    replaceOrders(state, action) {
      state.orders = action.payload.orders;
    },
    addOrder(state, action) {
      const Id = Date.now();
      const date = new Date().toLocaleDateString("en-En", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      state.orders = [
        {
          id: Id,
          cartItems: action.payload.cartItems,
          totalAmount: action.payload.totalAmount,
          date: date,
        },
        ...state.orders,
      ];
      state.changed = true;
    },
    removeOrder(state, action) {
      const ID = action.payload;
      state.orders = state.orders.filter((ord) => ord.id !== ID);
      state.changed = true;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
