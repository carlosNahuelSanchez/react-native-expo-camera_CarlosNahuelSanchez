import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [scanning, setScanning] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        if (scanning) {
            const timer = setTimeout(() => {
                setIsLoggedIn(true);
                setScanning(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [scanning]);

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Necesitamos permiso para usar la cámara</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Dar permiso</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (scanning) {
        return (
            <View style={{ flex: 1 }}>
                <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front" />
                <View style={styles.overlay}>
                    <Text style={styles.scanningText}>Escaneando rostro...</Text>
                </View>
            </View>
        );
    }

    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>¡Bienvenido!</Text>
                <Text style={styles.title}>Has iniciado sesión con reconocimiento facial.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <TextInput placeholder="Usuario" style={styles.input} />
            <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />
            <TouchableOpacity style={styles.button} onPress={() => setScanning(true)}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000ff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    input: {
        width: "100%",
        borderWidth: 2,
        fontWeight: "bold",
        backgroundColor: "#dcdcdcaa",
        borderColor: "#6b0000ff",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#adadadff",
        padding: 12,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#000000ff",
        fontWeight: "bold",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#ffffff",
    },
    overlay: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: "center",
    },
    scanningText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 18,
        backgroundColor: "#000000aa",
        padding: 10,        
        borderRadius: 5,
    },
});
