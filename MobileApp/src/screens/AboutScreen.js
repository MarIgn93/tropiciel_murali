import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>O Aplikacji ℹ️</Text>
            <Text variant="bodyLarge" style={styles.text}>
                Tropiciel Murali to projekt akademicki stworzony w celu inwentaryzacji i odkrywania sztuki ulicznej.
            </Text>
            <Text variant="bodyMedium" style={styles.version}>Wersja 1.0.0</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontWeight: 'bold', marginBottom: 20 },
    text: { textAlign: 'center', lineHeight: 24, color: '#555' },
    version: { marginTop: 30, color: '#999' }
});