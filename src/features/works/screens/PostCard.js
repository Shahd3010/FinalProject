import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star.svg";
import Ionicons from "react-native-vector-icons/Ionicons";

const PostCard = ({ name, photo, description, rating, comments, place }) => {
  const renderRating = () => {
    const ratingArray = Array.from({ length: Math.round(rating) });
    return ratingArray.map((_, index) => (
      <SvgXml key={index} xml={star} width={20} height={20} />
    ));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <Text>{description}</Text>
      <View style={styles.ratingContainer}>
        {renderRating()}
        <Text>{rating}</Text>
      </View>
      <Text>{comments}</Text>
      <Text>{place}</Text>
      <Ionicons name="chatbubble-outline" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  publisherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilephoto: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  photo: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PostCard;
