import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const WorkerProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: "https://placeimg.com/640/480/people" }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Jhn name</Text>
        <Text style={styles.profession}>Plumber</Text>
        <Text style={styles.location}>New York, NY</Text>
        <Text style={styles.description}>
          John is a licensed plumber with 10+ years of experience in residential
          and commercial plumbing. He is available for emergency repairs and
          routine maintenance.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profession: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "#999",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default WorkerProfile;
