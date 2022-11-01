import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../component/shop/CartItem";
import { ordersActions } from "../../store/orders";
import { cartActions } from "../../store/cart";
import { getCartData } from "../../store/cart-actions";

import Colors from "../../constants/Colors";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const error = useSelector((state) => state.ui.message);
  const isLoading = useSelector((state) => state.ui.isLoading);

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  const renderProduct = ({ item }) => {
    return <CartItem product={item} />;
  };

  const addToOrdersHandler = () => {
    dispatch(
      ordersActions.addOrder({
        cartItems: cart.cartItems,
        totalAmount: cart.totalAmount,
      })
    );
    dispatch(cartActions.removeAllItems());
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (cart.cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.totalTitle}>
          You didn't add anything to the cart yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {error && (
        <View style={styles.container}>
          <Text>{error}</Text>
        </View>
      )}
      <FlatList data={cart.cartItems} renderItem={renderProduct} />
      <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>Total Amount:</Text>
        <Text style={styles.totalAmount}>
          $ {Math.abs(cart.totalAmount.toFixed(2))}
        </Text>
      </View>
      <Pressable
        style={styles.button}
        disabled={cart.cartItems.length === 0}
        onPress={() => addToOrdersHandler()}
      >
        <Text style={styles.text}>Place this order</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
  },
  totalTitle: {
    fontFamily: "openSansBold",
    fontSize: 23,
    color: "black",
    textAlign: "center",
  },
  totalAmount: {
    fontFamily: "openSansBold",
    fontSize: 26,
    color: Colors.primary,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: Colors.primary,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default CartScreen;
