import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

const PublisherProfile = ({ publisherId, closeModal }) => {
  const [publisherData, setPublisherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublisherData = async () => {
      if (publisherId) {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users");
        const q = query(usersCollection, where("email", "==", publisherId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setPublisherData(userData);
        }
      }
      setIsLoading(false);
    };

    fetchPublisherData();
  }, [publisherId]);

  return (
    <Modal visible={true} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Publisher Profile</Text>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : publisherData ? (
          <View>
            <Text style={styles.publisherName}>{publisherData.name}</Text>
            <Text style={styles.publisherEmail}>{publisherData.email}</Text>
            {/* Render other publisher profile information */}
          </View>
        ) : (
          <Text style={styles.errorText}>Failed to load publisher data</Text>
        )}
        <Button title="Close" onPress={closeModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  publisherName: {
    fontSize: 18,
    marginBottom: 8,
  },
  publisherEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 8,
    color: "red",
  },
});

export default PublisherProfile;
