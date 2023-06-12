import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { listenToAuthState } from "../../../../firebaseConfig";

const testee = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = listenToAuthState(async (userId) => {
      if (userId) {
        try {
          const firestore = getFirestore();
          const userRef = collection(firestore, "users");
          const querySnapshot = await getDocs(
            query(userRef, where("userId", "==", userId))
          );

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const name = userData.name; // Assuming the user's name field is named "name"
            setUserName(name);
          }
        } catch (error) {
          console.log("Fetch user name error", error);
        }
      } else {
        setUserName(""); // User is not authenticated, clear the name
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Text>Welcome, {userName ? userName : "Guest"}</Text>
    </View>
  );
};

export default testee;
