import React, { useContext } from "react";
import styled from "styled-components/native";
import { List, Avatar } from "react-native-paper";
import { Text } from "react-native";
import Spacer from "react-native-spacer";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SafeAreaView } from "react-native-safe-area-context";

import Login from "./Login";
//import { AuthenticationContext } from "../../../services/authentication/authentication.context";
const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;
const SettingsScreen = ({ navigation }) => {
  //const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AvatarContainer>
        <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
        <Spacer position="top" size="large"></Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingsItem
          key="favourites"
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          key="logout"
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={Login}
        />
      </List.Section>
    </SafeAreaView>
  );
};
export default SettingsScreen;
