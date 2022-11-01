import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "react-native-vector-icons";

import { cartActions } from "../../store/cart";
import Card from "../UI/Card";
import Colors from "../../constants/Colors";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (prod) => {
    dispatch(cartActions.addToCartItems(prod));
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCartItems(id));
  };

  const deleteFromCartHandler = (id) => {
    dispatch(cartActions.deleteFromCartItems(id));
  };

  return (
    <Card style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: product.imageUrl }} />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price}</Text>
        </View>
        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => removeFromCartHandler(product.id)}
          >
            <Text style={styles.text}>-</Text>
          </Pressable>
          <Text style={styles.quantity}>{product.quantity}</Text>
          <Pressable
            style={styles.button}
            onPress={() => addToCartHandler(product)}
          >
            <Text style={styles.text}>+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.trashButton}>
        <TouchableOpacity onPress={() => deleteFromCartHandler(product.id)}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    height: 150,
    marginVertical: 8,
    alignSelf: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
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
    width: "50%",
    height: "100%",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ffdde1",
  },
  title: {
    fontFamily: "openSansBold",
    fontSize: 20,
    color: "black",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  price: {
    fontFamily: "openSans",
    fontSize: 16,
    color: Colors.primary,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.primary,
  },
  text: {
    fontFamily: "openSansBold",
    fontSize: 20,
    color: "white",
  },
  quantity: {
    fontFamily: "openSansBold",
    fontSize: 22,
  },
  trashButton: {
    width: "10%",
    backgroundColor: "#ffdde1",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartItem;
