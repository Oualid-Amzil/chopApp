import React from "react";
import { useCallback, useLayoutEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import { productsActions } from "../../store/products";

import { sendProduct } from "../../store/products";
import Input from "../../component/UI/Input";

import Colors from "../../constants/Colors";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.isvalid]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const ID = route.params ? route.params.id : null;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === ID)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: editedProduct ? editedProduct.price : "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const InputValues = {
    title: formState.inputValues.title,
    imageUrl: formState.inputValues.imageUrl,
    description: formState.inputValues.description,
    price: formState.inputValues.price,
  };

  const editProductHandler = () => {
    const changedProduct = { id: ID, ...InputValues };
    dispatch(productsActions.editProduct(changedProduct));
  };

  const addProductHandler = () => {
    dispatch(productsActions.addProduct(InputValues));
    // dispatch(sendProduct(InputValues));
  };

  const onPressHandler = () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the error in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (ID) {
      editProductHandler();
      navigation.goBack();
    } else {
      addProductHandler();
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ID ? "Edit Product" : "Add Product",
    });
  }, [navigation.setOptions]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: "FORM_INPUT_UPDATE",
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    []
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="image url"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />

          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.price : ""}
            initiallyValid={!!editedProduct}
            required
            min={0.1}
          />

          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
          <Pressable style={styles.button} onPress={onPressHandler}>
            <Text style={styles.text}>{!ID ? "ADD" : "EDIT"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "center",
    marginVertical: 20,
  },
  text: {
    fontFamily: "openSansBold",
    color: "white",
  },
});

export default EditProductScreen;
