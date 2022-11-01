import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Ionicons } from "react-native-vector-icons";

import { ordersActions } from "../../store/orders";
import OrderListItem from "./OrderListItem";
import Card from "../UI/Card";
import Colors from "../../constants/Colors";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const [showItems, setShowItems] = useState(false);

  const renderOrderItem = ({ item }) => {
    return <OrderListItem item={item} />;
  };

  const toggleShowHandler = () => {
    setShowItems(!showItems);
  };

  const removeOrderHandler = (id) => {
    dispatch(ordersActions.removeOrder(id));
  };

  return (
    <View>
      <Card style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.total}>
            Total: $ {order.totalAmount.toFixed(2)}
          </Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={toggleShowHandler}>
            <Text style={styles.text}>
              {showItems ? "Hide details" : "show details"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => removeOrderHandler(order.id)}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={20}
              color="white"
            />
          </Pressable>
        </View>
      </Card>
      {showItems && (
        <FlatList data={order.cartItems} renderItem={renderOrderItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 8,
    alignSelf: "center",
    justifyContent: "space-between",

    overflow: "hidden",
    backgroundColor: "white",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  total: {
    color: Colors.primary,
    fontFamily: "openSansBold",
    fontSize: 20,
  },
  date: {
    color: "green",
    fontFamily: "openSans",
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 4,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    fontFamily: "openSansBold",
    color: "white",
  },
});

export default OrderItem;
