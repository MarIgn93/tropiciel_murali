import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

// ⚠️ ZMIEŃ NA SWÓJ ADRES IP
const SERVER_IP = '192.168.1.29';

export default function MyMuralsScreen({ navigation }) {
    const [murals, setMurals] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchMurals();
        }, [])
    );

    const fetchMurals = async () => {
        try {
            const response = await axios.get(`http://${SERVER_IP}:5204/api/murals`);
            setMurals(response.data);
        } catch (error) {
            console.error('Błąd pobierania murali:', error);
        }
    };

    return (
        <View style={styles.container}>
            {murals.length === 0 ? (
                <Text variant="bodyLarge" style={styles.emptyText}>
                    Nie masz jeszcze żadnych murali na koncie.
                </Text>
            ) : (
                <FlatList
                    data={murals}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.list}
                    renderItem={({ item }) => (
                        // Po kliknięciu w kartę, przechodzimy do ekranu szczegółów!
                        <Card
                            style={styles.card}
                            onPress={() => navigation.navigate('MuralDetails', { mural: item })}
                        >
                            <Card.Title title={item.title} subtitle={item.description} />
                            {item.imageUri && (
                                <Card.Cover source={{ uri: item.imageUri }} style={styles.cardImage} />
                            )}
                        </Card>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
    emptyText: { textAlign: 'center', color: '#777', marginTop: 40 },
    list: { width: '100%' },
    card: { marginBottom: 15, backgroundColor: 'white', elevation: 4 },
    cardImage: { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }
});