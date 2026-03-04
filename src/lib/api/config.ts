/**
 * Shared API configuration
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Ensures the base URL always ends with a slash for correct relative path concatenation
// and includes /api prefix
const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
export const API_BASE = baseUrl + 'api/';
