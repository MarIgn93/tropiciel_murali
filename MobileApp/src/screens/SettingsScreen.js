import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, Divider } from 'react-native-paper';

export default function SettingsScreen() {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Ustawienia ⚙️</Text>

            <View style={styles.settingRow}>
                <Text variant="bodyLarge">Powiadomienia o nowych muralach</Text>
                <Switch
                    value={isNotificationsEnabled}
                    onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
                />
            </View>
            <Divider />

            <Text variant="bodyMedium" style={styles.info}>
                Kolejne opcje pojawią się w przyszłych aktualizacjach.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#f5f5f5' },
    title: { fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    info: { marginTop: 40, textAlign: 'center', color: '#999' }
});