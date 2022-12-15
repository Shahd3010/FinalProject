import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class RegisteSrcreen extends React.Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text> Signup Screen</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
