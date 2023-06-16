import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Settings = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users");
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  const handleChangePassword = () => {
    navigation.navigate("ChangePasswordScreen", { email });
    console.log("Change password");
  };

  const handleEditProfile = () => {
    console.log("Edit profile");
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 50 }}>
      {userData && (
        <>
          <View style={styles.userInfoContainer}>
            <Image style={styles.userPhoto} source={{ uri: userData.photo }} />
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Profile</Text>
            <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
              <Text style={styles.optionLabel}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Change Password</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={handleChangePassword}
            >
              <Text style={styles.optionLabel}>Change Password</Text>
              <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default Settings;
