import React from "react";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../component/UI/CustomHeaderButton";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "react-native-vector-icons";

import ProductsOverviewScreens from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const Stack = createNativeStackNavigator();

const defaultOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "openSansBold",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ShopNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="products"
        component={ProductsOverviewScreens}
        options={({ navigation }) => ({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName="ios-cart-outline"
                onPress={() => {
                  navigation.navigate("cart");
                }}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="menu"
                iconName={Platform.OS === "android" ? "md-menu" : "io-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="details"
        component={ProductDetailsScreen}
        options={({ route, navigation }) => ({
          title: route.params.title,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName="ios-cart-outline"
                onPress={() => {
                  navigation.navigate("cart");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen name="cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultOptions}>
      <OrdersStack.Screen
        name="orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </OrdersStack.Navigator>
  );
};

const UserSctack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <UserSctack.Navigator screenOptions={defaultOptions}>
      <UserSctack.Screen
        name="your product"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                onPress={() => {
                  navigation.navigate("Edit Product");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <UserSctack.Screen name="Edit Product" component={EditProductScreen} />
    </UserSctack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Shop"
        screenOptions={{
          drawerPosition: "left",
          headerShown: false,
          drawerStyle: {
            width: 200,
            backgroundColor: "#ffdde1",
          },
        }}
      >
        <Drawer.Screen
          name="Shop"
          component={ShopNavigator}
          options={{
            drawerActiveBackgroundColor: Colors.primary,
            drawerActiveTintColor: Colors.accent,
            drawerIcon: ({ size, focused }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={size}
                color={!focused ? Colors.primary : Colors.accent}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Orders"
          component={OrdersNavigator}
          options={{
            drawerActiveBackgroundColor: Colors.primary,
            drawerActiveTintColor: Colors.accent,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={size}
                color={focused ? Colors.accent : Colors.primary}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Admin"
          component={UserNavigator}
          options={{
            drawerActiveBackgroundColor: Colors.primary,
            drawerActiveTintColor: Colors.accent,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={size}
                color={focused ? Colors.accent : Colors.primary}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
