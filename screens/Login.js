import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { Input, NativeBaseProvider, Button, Icon } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshing, setRefreshing] = React.useState(false)
  const navigation = useNavigation("")

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(1000).then(() => setRefreshing(false))
  }, [])

  const handleClick = async () => {
    let body = {
      email: email,
      password: password,
    };

    fetch("http://snapi.epitech.eu:8000/connection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async function (response) {
      let jsonRes = await response.json();
      await SecureStore.setItemAsync("user_token", jsonRes.data.token);

    });
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} /> */}
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Login</Text>
      </View>
      <View style={styles.text2}>
        <Text>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonStyle}>
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="at" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            onChangeText={setEmail}
            name="email"
            placeholder="Email"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
        </View>
      </View>
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            onChangeText={setPassword}
            name="password"
            secureTextEntry={true}
            placeholder="Password"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
        </View>
      </View>
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={handleClick}>
          LOGIN
        </Button>
      </View>
      {/* <ScrollView /> */}
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
  },
  Middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },
  signupText: {
    fontWeight: "bold",
  },
  emailInput: {
    margin: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonDesign: {
    backgroundColor: "#000",
  }
});
