import axios from "axios";

// Create a configured instance of Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, //This sends cookies(tokens) automatically!
//   headers: {
//     "Content-Type": "application/json",
//   },
});

// Response Interceptor: Handles Errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Optional: You can handle 401 (Unauthorized) here to auto-logout
    // or trigger a token refresh in the future.
    
    // For now, just reject the error so the UI can show the message
    return Promise.reject(error);
  }
);

export default api;