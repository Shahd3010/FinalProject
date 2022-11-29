import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { WorkScreen } from "./src/features/works/screens/works.screen";

export default function App() {
  return (
    <>
      <WorkScreen />
      <ExpoStatusBar style="auto" />
    </>
  );
}
