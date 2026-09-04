import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function ContactScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Kontakt 📧</Text>
            <Text variant="bodyLarge" style={styles.text}>
                Masz pytania lub znalazłeś błąd w aplikacji?
            </Text>
            <Text variant="bodyMedium" style={styles.email}>
                admin@tropicielmurali.pl
            </Text>
            <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
                Wróć do Profilu
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontWeight: 'bold', marginBottom: 20 },
    text: { textAlign: 'center', marginBottom: 10, color: '#555' },
    email: { fontWeight: 'bold', color: '#007BFF', marginBottom: 30 },
    button: { width: '100%' }
});