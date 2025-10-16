// API Configuration - automatically selects correct URL based on environment

const getApiUrl = () => {
    // Check if we're in production (deployed site)
    const isProduction = window.location.hostname !== 'localhost' &&
                        window.location.hostname !== '127.0.0.1';

    if (isProduction) {
        // Production: Use relative path - Nginx will proxy /api to backend
        // No need to hardcode domain - same origin, no CORS issues
        return '';  // Empty string = relative paths like /api/pirate/...
    } else {
        // Development: Use localhost backend
        return 'http://localhost:9000';
    }
};

export const API_URL = getApiUrl();

console.log(`🚀 API URL: ${API_URL || '(relative)'} (Environment: ${window.location.hostname})`);
