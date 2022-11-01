import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceItemCart(state, action) {
      state.cartItems = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
    addToCartItems(state, action) {
      let item = action.payload;
      let existingItem = state.cartItems.find((prod) => item.id === prod.id);
      state.changed = true;
      if (!existingItem) {
        item = { ...action.payload, quantity: 1 };
        state.cartItems = [...state.cartItems, item];
      } else {
        existingItem.quantity = existingItem.quantity + 1;
      }

      state.totalAmount = state.totalAmount + item.price;
      state.totalQuantity = state.totalQuantity + 1;
    },
    removeFromCartItems(state, action) {
      const itemId = action.payload;
      let existingItem = state.cartItems.find((prod) => itemId === prod.id);
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((prod) => prod.id !== itemId);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
      }

      state.totalAmount = state.totalAmount - existingItem.price;
      state.totalQuantity = state.totalQuantity - 1;
    },
    deleteFromCartItems(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((prod) => itemId === prod.id);

      state.cartItems = state.cartItems.filter((prod) => itemId !== prod.id);

      state.totalAmount =
        state.totalAmount - existingItem.price * existingItem.quantity;
      state.totalQuantity = state.totalQuantity - existingItem.quantity;
      state.changed = true;
    },
    removeAllItems(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
