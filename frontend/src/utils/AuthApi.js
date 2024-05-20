// import jwt from 'jsonwebtoken';
import axios from 'axios';

// Utility class for all calls to backend that relate to authorization/users

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

// Create axios instance to centralize configuration
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
});
  
// Set interceptor to automatically include token for all requests as a Authorization header
api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
  
// our UserContext relies upon these functions
class AuthApi {

  static async register(userData) {
    try {
      const response = await api.post("/api/users/signup", userData);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response.data.message);
      throw error;
    }
  }

  // for some reason this was not working without the JSON.stringify (it was attaching token as an object)
  static async login(username, password) {
    try {
      const response = await api.post('/api/users/login', { username, password });
      const token = response.data.access_token
      if (token) {
        localStorage.setItem('token', JSON.stringify(token)); 
      }
      return token;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async verifyToken() {
    try {
      const response = await api.get('/api/protected');
      if (response.data.verified) {
        return response.data.verified;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async logout() {
    try {
      const response = await api.post('/api/users/logout');
      localStorage.removeItem('token'); // handle logout client-side by removing the token
      return response.data;
    } catch (error) {
      console.error("Error during logout:", error.response.data.message);
      throw error;
    }
  }

  static async fetchUserProfile(username) {
    try {
      const response = await api.get(`/api/users/profile/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error.response.data.message);
      throw error;
    }
  }

  static async addFavorite(player_id) {
    try {
      const response = await api.post(`/api/users/favorites/add/${player_id}`);
      return response.data;
    } catch (error) {
      console.error("Error adding favorite player:", error.response.data.message);
      throw error;
    }
  }

  static async deleteFavorite(player_id) {
    try {
      const response = await api.post(`/api/users/favorites/delete/${player_id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting favorite player:", error.response.data.message);
      throw error;
    }
  }

  static async deleteAccount() {
    try {
      const response = await api.post('/api/user/account/delete');
      localStorage.removeItem('token'); // Clean up token if account is deleted
      return response.data;
    } catch (error) {
      console.error("Error deleting account:", error.response.data.message);
      throw error;
    }
  }

}
  
  export default AuthApi;
