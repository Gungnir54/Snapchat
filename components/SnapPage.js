import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import SnapGallery from "./Gallery";
import SnapCamera from "./Camera";

export default function SnapPage() {
    return (
        <View style={StyleSheet.container}>
            <SnapCamera />
            <SnapGallery />
        </View>
    )
}