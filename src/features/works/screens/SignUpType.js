import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Signup from "./Signup";
import Login from "./Login";
import SignUpWorker from "./SignUpWorker";

const backgroundImage = require("../../../../assets/BACKGROUND_WORKER.webp");

export default function SignUpType() {
  const navigation = useNavigation();

  const onHandleSignup = () => {
    navigation.navigate("Signup");
  };

  const handleWorkerSignup = () => {
    navigation.navigate("SignUpWorker");
  };
  /*
  const handleCustomerSignup = () => {
    navigation.navigate("Signup");
  };
*/
  const handleGoBack = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Create an Account</Text>
      </ImageBackground>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.workerButton]}
          onPress={handleWorkerSignup}
        >
          <Text style={styles.buttonText}>Sign Up as a Worker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.customerButton]}
          onPress={onHandleSignup}
        >
          <Text style={styles.buttonText}>Sign Up as a Customer</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  button: {
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  workerButton: {
    backgroundColor: "#FF8C00",
  },
  customerButton: {
    backgroundColor: "#00BFFF",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  backButton: {
    alignSelf: "center",
    marginTop: 40,
  },
  backButtonText: {
    fontSize: 18,
    color: "#555",
  },
});
