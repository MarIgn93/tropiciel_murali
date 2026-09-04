import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'; // IMPORT GPS
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

// ⚠️ ZMIEŃ NA SWÓJ ADRES IP
const SERVER_IP = '192.168.1.29';

export default function AddMuralScreen({ navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false); // Blokada przycisku podczas pobierania GPS

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Błąd', 'Potrzebny dostęp do aparatu!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true, aspect: [4, 3], quality: 0.5,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSaveMural = async () => {
        if (!title || !description || !imageUri) {
            Alert.alert('Błąd', 'Wypełnij wszystkie pola i zrób zdjęcie!');
            return;
        }

        setIsSaving(true);

        try {
            // 1. POBIERANIE GPS
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Błąd', 'Aplikacja potrzebuje dostępu do lokalizacji, aby umieścić mural na mapie!');
                setIsSaving(false);
                return;
            }

            // Pobieramy aktualną pozycję z dokładnością do najwyższej
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

            // 2. WYSYŁKA DO SERWERA (Z GPS)
            const newMural = {
                title: title,
                description: description,
                imageUri: imageUri,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };

            await axios.post(`http://${SERVER_IP}:5204/api/murals`, newMural);

            Alert.alert('Sukces!', `Mural dodany na mapę!`);
            setTitle(''); setDescription(''); setImageUri(null);
            navigation.navigate('Mapa');

        } catch (error) {
            Alert.alert('Błąd sieci', 'Nie udało się połączyć z serwerem.');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Dodaj Nowy Mural 📸</Text>

            <TextInput label="Nazwa muralu" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
            <TextInput label="Opis / Lokalizacja" value={description} onChangeText={setDescription} mode="outlined" multiline numberOfLines={3} style={styles.input} />

            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}><Text variant="bodyMedium">Brak zdjęcia</Text></View>
            )}

            <Button icon="camera" mode="outlined" onPress={takePhoto} style={styles.button}>
                {imageUri ? 'Zmień zdjęcie' : 'Zrób zdjęcie'}
            </Button>

            <Button mode="contained" onPress={handleSaveMural} loading={isSaving} disabled={isSaving} style={[styles.button, styles.saveButton]}>
                Zapisz Mural (Odczyta GPS)
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20, paddingTop: 40 },
    title: { fontWeight: 'bold', marginBottom: 20, color: '#333' },
    input: { width: '100%', marginBottom: 15 },
    image: { width: '100%', height: 200, marginBottom: 15, borderRadius: 10 },
    placeholder: { width: '100%', height: 200, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderRadius: 10 },
    button: { width: '100%', marginBottom: 10 },
    saveButton: { backgroundColor: '#4CAF50', paddingVertical: 5, marginTop: 10 }
});