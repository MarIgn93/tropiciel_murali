import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function MuralDetailsScreen({ route, navigation }) {
    // Odbieramy dane konkretnego muralu przekazane przez nawigacjê z mapy
    const { mural } = route.params;

    return (
        <ScrollView style={styles.container}>
            {/* Du¿e zdjêcie na samej górze */}
            {mural.imageUri ? (
                <Image source={{ uri: mural.imageUri }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}><Text>Brak zdjêcia</Text></View>
            )}

            <View style={styles.contentBox}>
                <Text variant="headlineLarge" style={styles.title}>{mural.title}</Text>

                <Text variant="titleMedium" style={styles.subtitle}>Opis / Lokalizacja:</Text>
                <Text variant="bodyLarge" style={styles.description}>{mural.description}</Text>

                <Text variant="labelMedium" style={styles.gps}>
                    GPS: {mural.latitude.toFixed(5)}, {mural.longitude.toFixed(5)}
                </Text>

                <Button
                    mode="contained"
                    icon="map-marker-left"
                    onPress={() => navigation.goBack()}
                    style={styles.button}
                >
                    Wróæ do mapy
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    image: { width: '100%', height: 350, resizeMode: 'cover' },
    placeholder: { width: '100%', height: 350, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
    contentBox: { padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -20, elevation: 5 },
    title: { fontWeight: 'bold', marginBottom: 15, color: '#333' },
    subtitle: { fontWeight: 'bold', color: '#666', marginBottom: 5 },
    description: { marginBottom: 30, color: '#444', lineHeight: 24 },
    gps: { color: '#888', marginBottom: 20, textAlign: 'center' },
    button: { paddingVertical: 5 }
});