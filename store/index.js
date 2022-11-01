import { configureStore } from "@reduxjs/toolkit";

import productsSlice from "./products";
import cartSlice from "./cart";
import ordersSlice from "./orders";
import uiSlice from "./ui";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
