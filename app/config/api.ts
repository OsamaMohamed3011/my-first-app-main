// Base URL for the DummyJSON API
export const BASE_URL = 'https://dummyjson.com';

// Number of users to show per page
export const USERS_PER_PAGE = 10;

// API feature flags and settings
export const API_CONFIG = {
  // Add any API-specific configuration here
  enableCache: true,
  timeout: 5000, // milliseconds
  retryAttempts: 3
};

// API endpoint types
export interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface ApiEndpoints {
  users: {
    list: (limit: number, skip: number) => string;
    get: (id: number) => string;
    update: (id: number) => string;
    create: () => string;
    delete: (id: number) => string;
  };
}

// API endpoints configuration
export const API_ENDPOINTS: ApiEndpoints = {
  users: {
    // Get a list of users with pagination
    list: (limit: number, skip: number) => 
      `${BASE_URL}/users?limit=${limit}&skip=${skip}&select=firstName,lastName,bank,id,image,gender`,

    // Get a single user by ID
    get: (id: number) => 
      `${BASE_URL}/users/${id}`,

    // Update a user's information
    update: (id: number) => 
      `${BASE_URL}/users/${id}`,

    // Create a new user
    create: () => 
      `${BASE_URL}/users/add`,

    // Delete a user
    delete: (id: number) => 
      `${BASE_URL}/users/${id}`
  }
};
