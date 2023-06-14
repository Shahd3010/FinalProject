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
  Image,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function SignUpWorker() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState(null);
  const [choices, setChoices] = useState(["בנייה", "שיפוצים", "שטיחים", "נוף"]);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const handlePlaceChange = async (place) => {
    const apiKey = "your-api-key-here";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        console.log(location.lat, location.lng);
        // do something with location data
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUp = async () => {
    // Check if all required fields are filled
    if (!name || !email || !place || !phone || !description || !password) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    const auth = getAuth();
    // Create a new user account using Firebase authentication
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      const firestore = getFirestore();
      if (user) {
        // Save additional user data to Firestore or Realtime Database
        const newUser = {
          name,
          email,
          place,
          choices,
          phone,
          description,
          photo,
          type: "worker",
        };
        const userRef = collection(firestore, "users");
        await addDoc(userRef, newUser);

        // Save user data to AsyncStorage
        setUsers([...users, newUser]);
        await AsyncStorage.setItem("user", JSON.stringify(newUser));

        Alert.alert("Success", "User sign up successful");
        navigation.navigate("HomeScreenWorker", { user: response.user });
      }
    } catch (error) {
      console.log("SignUpWorker error", error);
      Alert.alert("Error", "User sign up failed");
    }
  };

  const handleChoicePress = (choice) => {
    console.log(`You selected: ${choice}`);
  };
  const handleSelectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <TouchableOpacity style={styles.button} onPress={handleSelectPhoto}>
        <Text style={styles.buttonText}>Select Photo</Text>
      </TouchableOpacity>

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
        onChangeText={(text) => {
          setPlace(text);
          handlePlaceChange(text);
        }}
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
    backgroundColor: "#f57c00",
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
    photo: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
  },
});
