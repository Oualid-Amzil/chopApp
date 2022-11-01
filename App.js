import { Provider } from "react-redux";
import store from "./store";
import MainNavigation from "./navigation/MainNavigation";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    openSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    openSans: require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
