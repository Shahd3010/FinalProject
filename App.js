import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { WorkScreen } from "./src/features/works/screens/works.screen";
import { ThemeProvider } from "styled-components/native";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "./src/components/utility/safe-area.component";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Settings = () => (
  <SafeArea>
    <Text></Text>
  </SafeArea>
);
const Map = () => (
  <SafeArea>
    <Text></Text>
  </SafeArea>
);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Services") {
                  iconName = "work";
                } else if (route.name === "Settings") {
                  iconName = "settings";
                } else if (route.name === "Map") {
                  iconName = "map";
                }

                return (
                  <MaterialIcons name={iconName} size={size} color={color} />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: "red",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Services" component={WorkScreen} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
