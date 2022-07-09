import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Text style={style.text}>Bienvenue sur My Snapchat bro !</Text>
        <Image
          style={style.image}
          source={require("../assets/snap_logo.png")}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "200%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 400,
  },
});