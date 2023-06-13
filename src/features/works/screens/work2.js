import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { MaterialIcons } from "react-native-vector-icons";

const Worker2 = ({ route }) => {
  const { user } = route.params;
  const email = user.email;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users");
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0];
          const userData = document.data();
          setUserData(userData);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: userData.photo }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData.name}</Text>
              <View style={styles.placeContainer}>
                <MaterialIcons name="location-on" size={24} color="#2F80ED" />
                <Text style={styles.place}>{userData.place}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.infoContainer}>
              <MaterialIcons
                name="phone"
                size={24}
                color="#2F80ED"
                style={styles.phoneIcon}
              />
              <Text style={styles.info}>{userData.phone}</Text>
              <MaterialIcons
                name="description"
                size={24}
                color="#2F80ED"
                style={styles.descriptionIcon}
              />
              <Text style={styles.info}>{userData.description}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#F4F4F4",
  },
  profileImage: {
    flex: 1,
    aspectRatio: 1,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  place: {
    fontSize: 18,
    color: "#666",
    marginLeft: 4,
  },
  detailsContainer: {
    alignItems: "center",
    padding: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  phoneIcon: {
    marginRight: 8,
  },
  descriptionIcon: {
    marginRight: 8,
  },
  info: {
    fontSize: 18,
    color: "#333",
    marginLeft: 8,
  },
});

export default Worker2;
