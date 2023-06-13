import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import Signup from "./Signup";
import HomeScreen from "./HomeScreen";
import SignUpType from "./SignUpType";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const backImage = require("../../../../assets/BACKGROUND_WORKER.webp");
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState([]);
  const auth = getAuth();

  const onHandleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        const user = response.user;

        // Retrieve the user data from Firestore
        const firestore = getFirestore();
        const userRef = collection(firestore, "users");
        const querySnapshot = await getDocs(
          query(userRef, where("email", "==", user.email))
        );

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          if (userData.type === "worker") {
            console.log("User is a worker");
            navigation.navigate("HomeScreenWorker", { user: response.user });
          }
        } else {
          console.log("User is not a worker");
          navigation.navigate("HomeScreen");
        }
      }
    } catch (error) {
      console.log("Login error", error);
      Alert.alert("Login error", error.message);
    }
  };
  const onForgotPassword = () => {
    // Perform any necessary validations before sending the password reset email
    if (!email) {
      Alert.alert(
        "Email Required",
        "Please enter your email to reset your password."
      );
      return;
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Password Reset Email Sent",
          "Please check your email to reset your password."
        );
      })
      .catch((error) => {
        console.log("Forgot Password error", error);
        Alert.alert("Forgot Password error", error.message);
      });
  };

  const onHandleSignUpType = () => {
    navigation.navigate("SignUpType");
  };

  const renderItem = ({ item }) => (
    <View style={styles.loginItem}>
      <Text style={styles.loginItemText}>Email: {item.email}</Text>
      <Text style={styles.loginItemText}>Password: {item.password}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />

      <View style={styles.whiteSheet} />

      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Workers Community</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {" "}
            LogIn
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 15 }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#f57c00",
              height: 50,
              borderRadius: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onHandleSignUpType}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              {" "}
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#8b4513",
    alignSelf: "center",
    paddingBottom: 35,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  forgotPasswordText: {
    color: "#8b4513",
    fontSize: 16,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
