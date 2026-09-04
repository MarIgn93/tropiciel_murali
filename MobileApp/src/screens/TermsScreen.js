import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function TermsScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Regulamin 📜</Text>
            <Text variant="bodyMedium" style={styles.text}>
                1. Użytkownik zobowiązuje się do dodawania zdjęć przedstawiających wyłącznie legalną sztukę uliczną (murale).{"\n\n"}
                2. Zabrania się dodawania treści obraźliwych, wulgarnych lub naruszających prawo.{"\n\n"}
                3. Aplikacja szanuje Twoją prywatność i przetwarza dane wyłącznie na potrzeby realizacji projektu.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, paddingTop: 40, backgroundColor: '#f5f5f5' },
    title: { fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    text: { lineHeight: 22, color: '#444' }
});