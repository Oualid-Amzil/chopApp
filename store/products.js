import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

import PRODUCTS from "../data/dummy-data";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteFromProducts(state, action) {
      const ID = action.payload;
      state.userProducts = state.userProducts.filter((prod) => prod.id !== ID);
      state.availableProducts = state.availableProducts.filter(
        (prod) => prod.id !== ID
      );
    },

    addProduct(state, action) {
      const Id = Date.now();
      const product = { id: Id, ownerId: "u1", ...action.payload };
      state.userProducts = [product, ...state.userProducts];
      state.availableProducts = [product, ...state.availableProducts];
    },

    editProduct(state, action) {
      const ID = action.payload.id;
      const indexOne = state.userProducts.findIndex((prod) => prod.id === ID);
      const indexTwo = state.availableProducts.findIndex(
        (prod) => prod.id === ID
      );

      state.userProducts[indexOne] = { ownerId: "u1", ...action.payload };
      state.availableProducts[indexTwo] = { ownerId: "u1", ...action.payload };
    },
  },
});

export const sendProduct = (product) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "put",
        url: "https://rn-complete-guide-21372-default-rtdb.firebaseio.com/products.json",
        data: product,
      });

      console.log(response.data);
    } catch (error) {
      dispatch(uiActions.error(error.message));
    }
  };
};

export const productsActions = productsSlice.actions;

export default productsSlice;
