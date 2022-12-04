import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StatusBar, SafeAreaView, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { WorkinfoCard } from "../components/work-info-card.components";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const WorkerList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export const WorkScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <WorkerList
      data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]}
      renderItem={() => <WorkinfoCard />}
    />
  </SafeArea>
);
