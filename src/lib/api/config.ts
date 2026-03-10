/**
 * Shared API configuration
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set');
}

// Ensures the base URL always ends with a slash for correct relative path concatenation
// and includes /api prefix
const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
export const API_BASE = baseUrl + 'v1/';
