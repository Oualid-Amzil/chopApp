import React from "react";
import { FlatList, Text, View, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { productsActions } from "../../store/products";
import ProductItem from "../../component/shop/ProductItem";

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really wnt to delete this item.", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteFromProducts(id));
        },
      },
    ]);
  };

  const renderProduct = ({ item }) => {
    return (
      <ProductItem
        item={item}
        onLeftButton={() => {
          navigation.navigate("Edit Product", { id: item.id });
        }}
        onRightButton={() => deleteHandler(item.id)}
        leftTitle="EDIT"
        rightTitle="DELETE"
      />
    );
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>You Have No Products.</Text>
      </View>
    );
  }

  return <FlatList data={userProducts} renderItem={renderProduct} />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "openSansBold",
    fontSize: 20,
  },
});

export default UserProductsScreen;
