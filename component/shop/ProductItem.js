import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Pressable,
} from "react-native";

import Card from "../UI/Card";
import Colors from "../../constants/Colors";

const ProductItem = ({
  item,
  onLeftButton,
  onRightButton,
  leftTitle,
  rightTitle,
}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={onLeftButton} useForeground>
      <Card style={styles.container}>
        <Image style={styles.image} source={{ uri: item.imageUrl }} />
        <View style={styles.text}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.bottom}>
          <Pressable style={styles.button} onPress={onLeftButton}>
            <Text style={styles.buttonText}>{leftTitle}</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={onRightButton}>
            <Text style={styles.buttonText}>{rightTitle}</Text>
          </Pressable>
        </View>
      </Card>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 400,
    margin: 20,
    overflow: "hidden",
    resizeMode: "contain",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "70%",
  },
  text: {
    height: "15%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },

  title: {
    fontFamily: "openSansBold",
    fontSize: 18,
    marginVertical: 4,
  },

  price: {
    fontFamily: "openSans",
    fontSize: 14,
    color: "#888",
  },

  button: {
    borderRadius: 10,
    backgroundColor: Colors.primary,
    color: "white",
    padding: 10,
  },

  buttonText: {
    color: "white",
    fontFamily: "openSansBold",
  },
});

export default ProductItem;
