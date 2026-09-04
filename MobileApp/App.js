import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import MuralDetailsScreen from './src/screens/MuralDetailsScreen';
import MyMuralsScreen from './src/screens/MyMuralsScreen';

// Nasze Ekrany i Nawigacja
import LoginScreen from './src/screens/LoginScreen';
import MainTabs from './src/navigation/MainTabs';
import AboutScreen from './src/screens/AboutScreen';
import TermsScreen from './src/screens/TermsScreen';
import ContactScreen from './src/screens/ContactScreen';   // NOWY EKRAN
import SettingsScreen from './src/screens/SettingsScreen'; // NOWY EKRAN

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">

                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="MyMurals" component={MyMuralsScreen} options={{ title: 'Moje Murale' }} />

                    {/* Ekrany informacyjne (Stack) */}
                    <Stack.Screen name="About" component={AboutScreen} options={{ title: 'O aplikacji' }} />
                    <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'Regulamin' }} />
                    <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Kontakt' }} />
                    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ustawienia' }} />
                    <Stack.Screen name="MuralDetails" component={MuralDetailsScreen} options={{ title: 'Szczegó³y Muralu' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}