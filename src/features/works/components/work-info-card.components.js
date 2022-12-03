import React from "react";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
const WorkerCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const WorkerCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.sizes.body};
  color: red;
`;
const Ratting = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
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
  const ratingArray = Array.from(new Array(Math.floor(rating)));
  console.log(ratingArray);
  return (
    <WorkerCard elevation={5}>
      <WorkerCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Title>{name}</Title>
        <Ratting>
          {ratingArray.map(() => (
            <SvgXml xml={star} width={20} height={20} />
          ))}
        </Ratting>

        <Address>{address} </Address>
      </Info>
    </WorkerCard>
  );
};
