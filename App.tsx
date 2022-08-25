import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, homeScreenOptions } from "./src/screens/home";
import {
  ArticleDetailsScreen,
  articlesScreenOptions,
  articlesScreenParams,
} from "./src/screens/articleDetails";
import { Provider } from "react-redux";

import { store } from "./src/store";

export type RootStackParamList = {
  Home: undefined;
  Article: articlesScreenParams;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={homeScreenOptions}
          />
          <Stack.Screen
            name="Article"
            component={ArticleDetailsScreen}
            options={articlesScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
