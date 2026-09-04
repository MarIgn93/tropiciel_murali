import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

// Wymagane przez Expo, aby móc zamknąć przeglądarkę po udanym logowaniu
WebBrowser.maybeCompleteAuthSession();

// Konfiguracja punktów końcowych GitHuba
const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
};

export default function LoginScreen({ navigation }) {
    // Generujemy dynamiczny link powrotny do Expo
    const redirectUri = makeRedirectUri({
        path: 'auth'
    });
    
    // Wypisujemy link do konsoli, aby łatwo go skopiować do GitHuba
    console.log("🚨 SKOPIUJ TO DO GITHUBA:", redirectUri);

    // Konfigurujemy żądanie OAuth 2.0
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'Ov23liGobB9rKGqSZQAf',
            scopes: ['read:user', 'user:email'],
            redirectUri: redirectUri,
        },
        discovery
    );

    // Nasłuchiwanie na powrót z przeglądarki
    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log("SUKCES! Otrzymany kod autoryzacyjny:", code);
            handleLoginSuccess(code);
        } else if (response?.type === 'error') {
            Alert.alert('Błąd autoryzacji', 'Nie udało się zalogować przez GitHub.');
        }
    }, [response]);

    const handleLoginSuccess = async (authCode) => {
        // Zapisujemy token i wchodzimy do aplikacji
        await SecureStore.setItemAsync('userToken', 'github-oauth-token-' + authCode);
        navigation.replace('Home');
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>Tropiciel 🕵️‍♂️</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>Logowanie dla odkrywców</Text>

            <Button
                mode="contained"
                icon="github"
                buttonColor="#333"
                disabled={!request}
                onPress={() => promptAsync()}
                style={styles.button}
            >
                Zaloguj przez GitHub
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
    title: { fontWeight: 'bold', color: '#333', marginBottom: 5 },
    subtitle: { color: '#666', marginBottom: 40 },
    button: { width: '100%', paddingVertical: 5 }
});