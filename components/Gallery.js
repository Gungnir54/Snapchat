import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import React, { useState } from "react";


const SnapGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required !")
            return
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync()

        if (pickerResult.cancelled === true) {
            return
        }

        setSelectedImage({ localUri: pickerResult.uri })
    }

    let openShareDialogAsync = async () => {
        if (Platform.OS === 'web') {
            alert('Uh oh, sharing is not available on your platform')
            return
        }

        await Sharing.shareAsync(selectedImage.localUri)
    }

    if (selectedImage != null) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                />
                <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Share this photo</Text>
                </TouchableOpacity>
                <StatusBar style='auto' />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#000",
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
})

export default SnapGallery