import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ChoiceScreen() {
  const [choices, setChoices] = useState(["בנייה", "שיפוצים", "שטיחים", "נוף"]);

  const handleChoicePress = (choice) => {
    // Handle choice press logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choices:</Text>

      <ScrollView contentContainerStyle={styles.choicesContainer}>
        {choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleChoicePress(choice)}
            style={styles.choice}
          >
            <FontAwesome name="paint-brush" size={40} color="#fff" />
            <Text style={styles.choiceText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#8b4513",
    alignSelf: "center",
    paddingBottom: 24,
  },
  choicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  choice: {
    backgroundColor: "#00BFFF",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  choiceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
