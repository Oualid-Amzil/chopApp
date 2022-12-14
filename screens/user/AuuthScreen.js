import React from "react";
import { View, ScrollView, StyleSheet, Button } from "react-native";

import Card from "../../component/UI/Card";
import Input from "../../component/UI/Input";

import Colors from "../../constants/Colors";

const AuthScreen = () => {
  return (
    <View style={styles.screen}>
      <Card>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address."
            onValueChange={() => {}}
            initialValue
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorMessage="Please enter a valid password."
            onValueChange={() => {}}
            initialValue
          />
          <Button
            title="Login"
            color={Colors.primaryColor}
            onPress={() => {}}
          />
          <Button
            title="Switch to Sign Up"
            color={Colors.accentColor}
            onPress={() => {}}
          />
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
