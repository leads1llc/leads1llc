import { Provider } from "react-redux";
import appStore from "./store";
import { HomePage } from "./pages/Home";

export function App() {
  return (
    <Provider store={appStore}>
      <HomePage />
    </Provider>
  );
}
