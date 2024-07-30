import { SplashScreen, Stack } from "expo-router";
import { FontProvider } from "../context/FontProvider";

import "react-native-url-polyfill/auto";

const RootLayout = () => {
  return (
    <FontProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="fetchbook" options={{ headerShown: false }} />
        <Stack.Screen name="createbook" options={{ headerShown: false }} />
        <Stack.Screen
          name="categorymanagement"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="editcategoryscreen"
          options={{ headerShown: false }}
        />
      </Stack>
    </FontProvider>
  );
};

export default RootLayout;
