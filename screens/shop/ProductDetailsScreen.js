import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { cartActions } from "../../store/cart";
import Colors from "../../constants/Colors";

const ProductDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const productId = route.params.productId;

  const product = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  const addToCartHandler = (prod) => {
    dispatch(cartActions.addToCartItems(prod));
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.action}>
        <Button
          color={Colors.primary}
          style={styles.button}
          title="ADD TO CART"
          onPress={() => addToCartHandler(product)}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "openSansBold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    lineHeight: 22,
    fontFamily: "openSans",
  },
});

export default ProductDetailsScreen;
