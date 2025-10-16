// API Configuration - automatically selects correct URL based on environment

export default function apiBase() {
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (isLocal) {
        return 'http://localhost:9000';
    }
    // Production: use same-origin so /api proxies via nginx
    return window.location.origin;
}

// For backwards compatibility with existing code
export const API_URL = apiBase();

console.log(`🚀 API URL: ${API_URL} (Environment: ${window.location.hostname})`);
