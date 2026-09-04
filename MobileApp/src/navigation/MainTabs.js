import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importujemy nasze 3 ekrany
import HomeScreen from '../screens/HomeScreen';
import AddMuralScreen from '../screens/AddMuralScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // Konfiguracja ikon dla poszczególnych zak³adek
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Mapa') iconName = 'map-marker';
                    else if (route.name === 'Dodaj') iconName = 'camera-plus';
                    else if (route.name === 'Profil') iconName = 'account';

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007BFF', // Kolor aktywnej zak³adki (niebieski)
                tabBarInactiveTintColor: 'gray',  // Kolor nieaktywnej zak³adki
                headerShown: false, // Ukrywamy górny pasek systemowy (wygl¹da nowoczeœniej)
            })}
        >
            <Tab.Screen name="Mapa" component={HomeScreen} />
            <Tab.Screen name="Dodaj" component={AddMuralScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}