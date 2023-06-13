import React from "react";
import { View, Text } from "react-native";

const Worker2 = ({ route }) => {
  const { user } = route.params;
  const email = user.email;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello, Worker2!</Text>
      <Text>Email: {email}</Text>
    </View>
  );
};

export default Worker2;
