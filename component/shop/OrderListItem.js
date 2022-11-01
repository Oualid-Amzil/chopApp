import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Card from "../UI/Card";
import Colors from "../../constants/Colors";

const OrderListItem = ({ item }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <View>
          {item.title.length < 15 && (
            <Text style={styles.title}>{item.title}</Text>
          )}
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <View style={styles.quantityWrapper}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.quantity}>{item.quantity}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.imageUrl }} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "80%",
    height: 100,
    marginVertical: 8,
    alignSelf: "center",
    overflow: "hidden",
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    resizeMode: "contain",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    width: "60%",
    height: "100%",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "openSansBold",
    fontSize: 20,
    color: "black",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  price: {
    fontFamily: "openSansBold",
    fontSize: 16,
    color: Colors.primary,
  },
  quantityWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "openSansBold",
    fontSize: 20,
    color: "black",
  },
  quantity: {
    fontFamily: "openSansBold",
    color: Colors.primary,
    fontSize: 22,
  },
});

export default OrderListItem;
