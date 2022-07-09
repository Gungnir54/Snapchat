import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import Home from "../components/HomePage";
import Snap from "../components/SnapPage";
import Contact from "../components/ContactPage";
import Logout from "../components/LogoutPage";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Home />
    </View>
  );
}

function SnapScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Snap />
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Contact />
    </View>
  );
}

function DisconnectScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Logout />
    </View>
  );
}

const Tab = createBottomTabNavigator();

MainPage = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Snap") {
            iconName = "camera";
          } else if (route.name === "Contact") {
            iconName = "people";
          } else if (route.name === "Disconnect") {
            iconName = "log-out";
            color = "red";
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Disconnect" component={DisconnectScreen} />
    </Tab.Navigator>
  );
}

export default MainPage
