import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ⚠️ Aktualny adres IP komputera i właściwy port serwera C# (5252)
const SERVER_IP = '192.168.1.29';
const SERVER_PORT = '5204';

export default function HomeScreen({ navigation }) {
    const [murals, setMurals] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchMurals();
        }, [])
    );

    const fetchMurals = async () => {
        try {
            const response = await axios.get(`http://${SERVER_IP}:${SERVER_PORT}/api/murals`);
            setMurals(response.data);
        } catch (error) {
            console.error('Błąd pobierania murali:', error);
        }
    };

    const handleMessageFromMap = (event) => {
        const muralId = parseInt(event.nativeEvent.data, 10);
        const selectedMural = murals.find(m => m.id === muralId);

        if (selectedMural) {
            navigation.navigate('MuralDetails', { mural: selectedMural });
        }
    };

    const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { padding: 0; margin: 0; }
        #map { height: 100vh; width: 100vw; }
        .popup-container { text-align: center; font-family: sans-serif; min-width: 140px; }
        .popup-img { width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; }
        .popup-title { font-weight: bold; font-size: 14px; margin: 0 0 10px 0; color: #333; }
        .popup-btn { background-color: #007BFF; color: white; border: none; padding: 8px; border-radius: 5px; width: 100%; font-weight: bold; cursor: pointer; }
        .popup-btn:active { background-color: #0056b3; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([51.9194, 19.1451], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: 'Tropiciel Murali'
        }).addTo(map);

        function openDetails(id) {
          window.ReactNativeWebView.postMessage(id.toString());
        }

        ${murals.map(m => {
        const safeTitle = m.title.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const safeImg = m.imageUri ? "<img src='" + m.imageUri + "' class='popup-img' />" : "";

        return `
            L.marker([${m.latitude}, ${m.longitude}])
             .addTo(map)
             .bindPopup(
               '<div class="popup-container">' +
                 "${safeImg}" +
                 '<h3 class="popup-title">${safeTitle}</h3>' +
                 '<button class="popup-btn" onclick="openDetails(${m.id})">Szczegóły</button>' +
               '</div>'
             );
          `;
    }).join('')}
      </script>
    </body>
    </html>
  `;

    return (
        <View style={styles.container}>
            <WebView
                source={{ html: mapHtml }}
                style={styles.map}
                scrollEnabled={false}
                originWhitelist={['*']}
                allowFileAccess={true}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
                onMessage={handleMessageFromMap}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    map: { flex: 1 }
});