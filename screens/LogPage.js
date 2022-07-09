import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./SignUp";

const Stack = createStackNavigator();

LogPage = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}

export default LogPage
