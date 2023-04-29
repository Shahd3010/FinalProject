import React, { useState } from "react";
import HomeScreenWorker from "./HomeScreenWorker";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export default function SignUpWorker() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [choices, setChoices] = useState(["construction", "Home Improvement"]);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const handleSignUp = async () => {
    // Check if all required fields are filled
    if (!name || !email || !place || !phone || !description || !password) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    // Save user data to AsyncStorage
    const newUser = {
      name,
      email,
      place,
      choices,
      phone,
      description,
      password,
    };
    setUsers([...users, newUser]);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Success", "User sign up successful");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "User sign up failed");
    }
    navigation.navigate("HomeScreenWorker");
  };

  const handleChoicePress = (choice) => {
    console.log(`You selected: ${choice}`);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Place"
        value={place}
        onChangeText={(text) => setPlace(text)}
      />
      <View style={styles.choicesContainer}>
        <Text style={styles.label}>Choices:</Text>
        <View style={styles.choices}>
          {choices.map((choice, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleChoicePress(choice)}
              style={styles.choice}
            >
              <Text>{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <HomeScreenWorker name={name} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#8b4513",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  choicesContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  choice: {
    backgroundColor: "#00BFFF",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
