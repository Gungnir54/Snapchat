import React, { Component, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

export default class Logout extends Component {

  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  LogoutClick = () => {
    SecureStore.deleteItemAsync('user_token')
    alert('See you soon on My Snapchat !')
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure ?</Text>
              <Pressable
                style={[styles.button, styles.buttonDisc]}
                onPress={() =>
                  this.LogoutClick()
                }
              >
                <Text style={styles.textStyle}>Yes !</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonBack]}
                onPress={() =>
                  this.setModalVisible(!modalVisible)
                }
              >
                <Text style={styles.textStyle}>back to appli</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Press to disconnect</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#000",
  },
  buttonDisc: {
    backgroundColor: "#FF0000",
    marginBottom: 10
  },
  buttonBack: {
    backgroundColor: "#000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
