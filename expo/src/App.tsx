import { ScrollView } from "react-native";
import { NavBar } from "./components/NavBar";
import { Provider } from "react-redux";
import appStore from "./store";

export function App() {
  return (
    <Provider store={appStore}>
      <ScrollView>
        <NavBar />
      </ScrollView>
    </Provider>
  );
}
