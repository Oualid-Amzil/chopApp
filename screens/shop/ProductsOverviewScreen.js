import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { cartActions } from "../../store/cart";

import { sendCartData } from "../../store/cart-actions";
import { sendOrderData } from "../../store/orders-actions";
import ProductItem from "../../component/shop/ProductItem";

let isInitial = true;

const ProductsOverviewScreens = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const cart = useSelector((state) => state.cart);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (orders.changed) {
      dispatch(sendOrderData(orders));
    }
  }, [orders, dispatch]);

  const addToCartHandler = (prod) => {
    dispatch(cartActions.addToCartItems(prod));
  };

  const renderProduct = ({ item }) => {
    return (
      <ProductItem
        item={item}
        onLeftButton={() => {
          navigation.navigate("details", {
            productId: item.id,
            title: item.title,
          });
        }}
        onRightButton={() => addToCartHandler({ ...item })}
        leftTitle="VIEW DETAILS"
        rightTitle="ADD TO CART"
      />
    );
  };

  return <FlatList data={products} renderItem={renderProduct} />;
};

export default ProductsOverviewScreens;
