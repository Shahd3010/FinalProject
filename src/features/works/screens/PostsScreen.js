import React from "react";
import { View, StyleSheet } from "react-native";
import PostCard from "./PostCard";
const post = {
  publisher: {
    name: "John Doe",
    profilePhoto: "https://example.com/profile-photo.jpg",
  },
  photo: "https://example.com/post-photo.jpg",
  description: "This is the description of the post.",
  rating: 4.5,
  comments: "Some comments on the post.",
  place: "New York City",
};
const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <PostCard
        publisher={post.publisher}
        photo={post.photo}
        description={post.description}
        rating={post.rating}
        comments={post.comments}
        place={post.place}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
});

export default PostsScreen;
