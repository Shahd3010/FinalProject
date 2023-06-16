import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
const PostCard = ({ post }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [publisherPhoto, setPublisherPhoto] = useState(null);
  const [publisherName, setPublisherName] = useState("");
  const [publisherType, setPublisherType] = useState("");
  const [publisherPlace, setPublisherPlace] = useState("");
  const [publisherDes, setPublisherDes] = useState("");
  const [publisherPhone, setPublisherPhone] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPublisherPhoto = async () => {
      if (post.publisherId) {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users");
        const q = query(
          usersCollection,
          where("email", "==", post.publisherId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log("User Data:", userData);
          setPublisherPhoto(userData.photo);
          setPublisherName(userData.name);
          setPublisherType(userData.choices);
          setPublisherDes(userData.description);
          setPublisherPlace(userData.place);
          setPublisherPhone(userData.phone);
        }
      }
    };

    fetchPublisherPhoto();
  }, [post.publisherid]);

  const handleChatPress = () => {
    navigation.navigate("Chat");
  };
  const handlePhonePress = () => {
    // Check if the phone number is available
    if (publisherPhone) {
      // Remove any non-digit characters from the phone number
      const phoneNumber = publisherPhone.replace(/\D/g, "");

      // Make the phone call
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeProfileModal = () => {
    setProfileModalVisible(false);
  };

  const closePostModal = () => {
    setPostModalVisible(false);
  };
  return (
    <View style={styles.card}>
      <View style={styles.publisherContainer}>
        <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
          <Image
            style={styles.publisherPhoto}
            source={{ uri: publisherPhoto }}
          />
        </TouchableOpacity>
        <Text style={styles.description}>{post.text}</Text>
        <Modal
          visible={profileModalVisible}
          animationType="slide"
          onRequestClose={closeProfileModal}
        >
          <ScrollView>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeProfileModal}
              >
                <Ionicons name="close-circle" size={32} color="#f57c00" />
              </TouchableOpacity>

              <View style={styles.publisherInfoContainer}>
                <Image
                  style={styles.publisherPhoto}
                  source={{ uri: publisherPhoto }}
                />
                <View style={styles.publisherInfo}>
                  <Text style={styles.publisherName}>{publisherName}</Text>
                  <View style={styles.publisherDetailsContainer}>
                    <Ionicons name="call-outline" size={18} color="#333" />
                    <TouchableWithoutFeedback onPress={handlePhonePress}>
                      <Text style={styles.publisherDetails}>
                        {publisherPhone}
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>

                  <View style={styles.publisherDetailsContainer}>
                    <Ionicons name="location-outline" size={18} color="#333" />
                    <Text style={styles.publisherDetails}>
                      {publisherPlace}
                    </Text>
                  </View>
                  <Text style={styles.publisherType}>{publisherType}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
      <TouchableOpacity onPress={handleImagePress}>
        {post.imageUrl ? (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: post.imageUrl }} />
          </View>
        ) : (
          <View style={styles.placeholderImage} />
        )}
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={handleChatPress}
        >
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Image style={styles.modalImage} source={{ uri: post.imageUrl }} />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  publisherInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  publisherInfo: {
    marginLeft: 8,
  },
  publisherName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  publisherDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  publisherDetails: {
    marginLeft: 4,
    color: "#666",
  },
  publisherType: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#ccc",
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 18,
    color: "#666",
    marginBottom: 6,
  },
  messageButton: {
    backgroundColor: "#f57c00",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  publisherPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});

export default PostCard;
