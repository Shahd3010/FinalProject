import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

const Title = styled.Text`
  padding: 5px;
  color: red;
  font-family: Copperplate;
  font-size: 15;
`;
export const WorkinfoCard = ({ work = {} }) => {
  const {
    name = "shahd",
    icon,
    photos = [
      "https://cdn.xxl.thumbs.canstockphoto.co.il/%D7%A6%D7%91%D7%A2-%D7%9B%D7%99%D7%9C%D7%A3-%D7%A2%D7%95%D7%91%D7%93-%D7%A9%D7%9C%D7%99-%D7%9E%D7%95%D7%98-%D7%92%D7%9C%D7%99%D7%9C%D7%99-%D7%95%D7%A7%D7%98%D7%95%D7%A8-%D7%A7%D7%9C%D7%99%D7%A4-%D7%90%D7%A8%D7%98_csp42201450.jpg",
    ],
    address = "Hura",
    rating = 5,
    flag,
  } = work;
  return (
    <Card elevation={5} style={styles.card}>
      <Card.Cover key={name} style={styles.cover} source={{ uri: photos[0] }} />
      <Title>{name}</Title>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
  },
  cover: {
    backgroundColor: "white",
  },
});
