import { ScrollView } from "react-native";
import { NavBar } from "./components/NavBar";
import { Provider } from "react-redux";
import appStore from "./store";
import { HeroSection } from "./components/HeroSection";

export function App() {
  return (
    <Provider store={appStore}>
      <ScrollView>
        <NavBar />
        <HeroSection />
      </ScrollView>
    </Provider>
  );
}
