import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "./src/styles/global.css";
import Login from "./src/app/Login";
import Register from "./src/app/Register";
import Home from "./src/app/Home";
import Details from "./src/app/Details";
import Profile from "./src/app/Profile";
import Favorites from "./src/app/Favorites";
import { AuthProvider } from "./src/context/AuthContext";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Details: { stockId: string };
  Profile: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
