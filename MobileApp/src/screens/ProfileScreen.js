import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen({ navigation }) {

    const handleLogout = async () => {
        // Usunięcie tokenu i powrót do logowania
        await SecureStore.deleteItemAsync('userToken');
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Twój Profil 👤</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>Witaj, Tropicielu!</Text>

            {/* Menu nawigacyjne */}
            <View style={styles.menuBox}>
                <Button mode="text" icon="image-multiple" onPress={() => navigation.navigate('MyMurals')} contentStyle={styles.menuItem} textColor="#333">
                    Moje murale
                </Button>
                <Divider />
                <Button mode="text" icon="information" onPress={() => navigation.navigate('About')} contentStyle={styles.menuItem} textColor="#333">
                    O aplikacji
                </Button>
                <Divider />
                <Button mode="text" icon="file-document" onPress={() => navigation.navigate('Terms')} contentStyle={styles.menuItem} textColor="#333">
                    Regulamin
                </Button>
                <Divider />
                <Button mode="text" icon="email" onPress={() => navigation.navigate('Contact')} contentStyle={styles.menuItem} textColor="#333">
                    Kontakt
                </Button>
                <Divider />
                <Button mode="text" icon="cog" onPress={() => navigation.navigate('Settings')} contentStyle={styles.menuItem} textColor="#333">
                    Ustawienia
                </Button>
            </View>

            <Button mode="contained" buttonColor="#d32f2f" onPress={handleLogout} style={styles.button}>
                Wyloguj się
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
    title: { fontWeight: 'bold', marginBottom: 10, color: '#333' },
    subtitle: { marginBottom: 30, color: '#666' },
    menuBox: { width: '100%', backgroundColor: 'white', borderRadius: 10, marginBottom: 30, elevation: 3, paddingVertical: 10 },
    menuItem: { justifyContent: 'flex-start', paddingLeft: 10 },
    button: { width: '100%', paddingVertical: 5 }
});