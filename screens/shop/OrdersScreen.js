import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { getOrderData } from "../../store/orders-actions";
import OrderItem from "../../component/shop/OrderItem";

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const error = useSelector((state) => state.ui.message);
  const isLoading = useSelector((state) => state.ui.isLoading);

  useEffect(() => {
    dispatch(getOrderData());
  }, [dispatch]);

  const renderOrders = ({ item }) => {
    return <OrderItem order={item} />;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You Made No Orders.</Text>
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
      <FlatList data={orders} renderItem={renderOrders} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ee9ca7",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "openSansBold",
    fontSize: 20,
  },
});

export default OrdersScreen;
