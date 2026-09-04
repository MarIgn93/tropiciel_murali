// TUTAJ WPISUJESZ SWOJE AKTUALNE IP (tylko w tym jednym miejscu!)
const CURRENT_IP = '10.50.38.21';

export const CONFIG = {
    // Dla logowania przez GitHub
    REDIRECT_URI: `exp://${CURRENT_IP}:8081/--/`,

    // Dla zapyta� do Twojego backendu w C# (upewnij si�, �e port 5000 si� zgadza z Twoim API)
    API_URL: `http://${CURRENT_IP}:5000/api`,
};