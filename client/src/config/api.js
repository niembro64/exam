// API Configuration - automatically selects correct URL based on environment

const getApiUrl = () => {
    // Check if we're in production (deployed site)
    const isProduction = window.location.hostname !== 'localhost' &&
                        window.location.hostname !== '127.0.0.1';

    if (isProduction) {
        // Production: Use your deployed backend URL
        // TODO: Replace this with your actual deployed backend URL
        return 'https://pirates-api.niemo.io'; // Update this with your actual backend URL
    } else {
        // Development: Use localhost
        return 'http://localhost:9000';
    }
};

export const API_URL = getApiUrl();

console.log(`🚀 API URL: ${API_URL} (Environment: ${window.location.hostname})`);
