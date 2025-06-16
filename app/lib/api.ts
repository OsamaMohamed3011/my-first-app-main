import { BASE_URL, USERS_PER_PAGE } from '../config/api';
import { User, ApiResponse, UsersResponse } from '../types';

// API endpoints configuration
export const API_ENDPOINTS = {
  users: {
    // Get a list of users with pagination
    list: (limit: number = USERS_PER_PAGE, skip: number = 0) => 
      `${BASE_URL}/users?limit=${limit}&skip=${skip}&select=firstName,lastName,bank,id,image,gender`,
    
    // Get a single user by ID
    get: (id: number) => 
      `${BASE_URL}/users/${id}`,
    
    // Update a user's information
    update: (id: number) => 
      `${BASE_URL}/users/${id}`,
    
    // Delete a user
    delete: (id: number) => 
      `${BASE_URL}/users/${id}`,
    
    // Create a new user
    create: () => 
      `${BASE_URL}/users/add`
  }
};

// Helper function to make API requests
export async function makeApiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// API client functions
export async function fetchUsers(page: number = 1): Promise<ApiResponse<User[]>> {
  try {
    const skip = (page - 1) * USERS_PER_PAGE;
    const data = await makeApiRequest<UsersResponse>(API_ENDPOINTS.users.list(USERS_PER_PAGE, skip));
    
    if (!data.users || !Array.isArray(data.users)) {
      throw new Error('Invalid response format: users array is missing or invalid');
    }

    return {
      data: data.users,
      status: 200
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      data: [],
      status: 500,
      message: error instanceof Error ? error.message : 'Failed to fetch users'
    };
  }
}

export async function fetchUser(id: number): Promise<ApiResponse<User>> {
  try {
    const data = await makeApiRequest<User>(API_ENDPOINTS.users.get(id));
    
    if (!data || !data.id) {
      throw new Error('Invalid response format: user data is missing or invalid');
    }

    return {
      data,
      status: 200
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      status: 500,
      message: error instanceof Error ? error.message : 'Failed to fetch user'
    };
  }
}

export { USERS_PER_PAGE };
