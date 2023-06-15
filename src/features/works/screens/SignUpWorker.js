import React, { useState } from "react";
import HomeScreenWorker from "./HomeScreenWorker";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
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
        // Save additional user data to Firestore
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
    setChoices([choice]);
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

  const handlePlaceChange = (selectedPlace) => {
    // Perform operations with the selected place
    console.log("Selected Place:", selectedPlace);
    // Save the selected place to the state or database as needed
    setPlace(selectedPlace);
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            {photo && <Image source={{ uri: photo }} style={styles.photo} />}
            <TouchableOpacity style={styles.button} onPress={handleSelectPhoto}>
              <Text style={styles.buttonText}>תבחר תמונה</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="שם"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="מייל"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <GooglePlacesAutocomplete
              placeholder="מיקום"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                setPlace(data.description);
                handlePlaceChange(data.description);
              }}
              query={{
                key: "AIzaSyAWiyyQ5aNjGu6RzqE9ni2K5f2G9Ac270Y",

                language: "iw", // Change to the desired language
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
                    <Text style={styles.choiceText}>{choice}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="מספר טלפון"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="תיאור כללי"
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="סיסמה"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>הרשמה</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
  },
  input: {
    height: 40,
    borderColor: "#f57c00",
    borderWidth: 1,
    marginBottom: 15, // Increased spacing
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#f57c00",
    padding: 10,
    marginBottom: 15, // Increased spacing
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 5,
  },
  choicesContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  choice: {
    backgroundColor: "#f57c00",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  choiceText: {
    color: "#fff",
  },
});
