import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button,  Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from 'expo-media-library';


export default function SnapCamera() {
    let cameraRef = useRef()
    const [hasCameraPermission, setHasCameraPermission] = useState()
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
    const [photo, setPhoto] = useState()

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            const MediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
            setHasCameraPermission(cameraPermission.status === "granted")
            setHasMediaLibraryPermission(MediaLibraryPermission.status === "granted")
        })()
    }, [])

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }

    let newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
    }

    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined)
            })
        }

        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined)
            })
        }

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Button title="Share" onPress={sharePic} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined }
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        )
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.button}>
                <Button title="" onPress={takePic} />
            </View>
            <StatusBar style='auto' />
        </Camera>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 400,
        height: 400
    },
    button: {
        borderWidth: 5,
        borderColor: '#ffffff50',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#ffffff50',
        borderRadius: 100,
        marginBottom: 10,
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1,
    },
})