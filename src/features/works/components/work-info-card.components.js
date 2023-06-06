import React from "react";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import { Text } from "../../../components/typography/text.component";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Icon,
  WorkerCard,
  WorkerCardCover,
  Info,
  Ratting,
  Address,
} from "./work-info-card.styles";

export const WorkinfoCard = ({ work = {} }) => {
  const {
    name = "Shahd",
    icon,
    photos = [
      "https://cdn.xxl.thumbs.https://www.kuhnflooring.com/wp-content/uploads/2016/10/porcelain-700x463.jpg.co.il/%D7%A6%D7%91%D7%A2-%D7%9B%D7%99%D7%9C%D7%A3-%D7%A2%D7%95%D7%91%D7%93-%D7%A9%D7%9C%D7%99-%D7%9E%D7%95%D7%98-%D7%92%D7%9C%D7%99%D7%9C%D7%99-%D7%95%D7%A7%D7%98%D7%95%D7%A8-%D7%A7%D7%9C%D7%99%D7%A4-%D7%90%D7%A8%D7%98_csp42201450.jpg",
    ],
    address = "Hura-beershev",
    rating = 4,
    flag,
  } = work;

  const ratingArray = Array.from(new Array(Math.floor(rating)));
  console.log(ratingArray);
  return (
    <WorkerCard elevation={5}>
      <WorkerCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="hint">{name}</Text>
        <Ratting>
          {ratingArray.map(() => (
            <SvgXml xml={star} width={20} height={20} />
          ))}
        </Ratting>

        <Address>{address} </Address>
        <Ionicons name="chatbubble-outline" size={24} color="black" />
      </Info>
    </WorkerCard>
  );
};
