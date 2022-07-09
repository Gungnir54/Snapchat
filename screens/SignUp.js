import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, NativeBaseProvider, Button, Icon } from 'native-base';
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Signup() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = () => {
        console.log(email);
        console.log(password);

        let body = {
            'email' : email,
            'password' : password
        }

        fetch('http://snapi.epitech.eu:8000/inscription', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }).then(async function (response) {
            jsonRes = await response.json()
            console.log(jsonRes)
            alert('You are registered ! Please, login to continu on My Snapchat :)')
        })
    }

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Signup</Text>
            </View>
            <View style={styles.text2}>
                <Text>Already have account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={styles.signupText}>Login</Text></TouchableOpacity>
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
                        variant= "outline"
                        onChangeText={setEmail}
                        name= 'email'
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
                        name= 'password'
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder="Password"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50"
                        }}
                    />
                </View>
            </View>
            <View style={styles.buttonStyle}>
                <Button style={styles.buttonDesign} onPress={handleClick}>
                    REGISTER NOW
                </Button>
            </View>
        </View>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Signup />
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    LoginText: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: 'bold',
    },
    Middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5,
    },
    signupText: {
        fontWeight: 'bold',
    },
    emailInput: {
        marginTop: 10,
        marginRight: 15,
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
        backgroundColor: '#000'
    },
})