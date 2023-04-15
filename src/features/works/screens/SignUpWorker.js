import React, { useState } from "react";
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

export default function SignUpWorker() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [choices, setChoices] = useState([]);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // Check if all required fields are filled
    if (!name || !email || !place || !phone || !description || !password) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    // Save user data to AsyncStorage
    const user = {
      name,
      email,
      place,
      choices,
      phone,
      description,
      password,
    };
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Success", "User sign up successful");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "User sign up failed");
    }
  };

  const handleAddChoice = (newChoice) => {
    setChoices([...choices, newChoice]);
  };

  const handleRemoveChoice = (indexToRemove) => {
    setChoices(choices.filter((choice, index) => index !== indexToRemove));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Worker Sign Up</Text>
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
              style={styles.choice}
              onPress={() => handleRemoveChoice(index)}
            >
              <Text>{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Add choice"
          value={""}
          onChangeText={(text) => handleAddChoice(text)}
          onSubmitEditing={() => handleAddChoice("")}
        />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
