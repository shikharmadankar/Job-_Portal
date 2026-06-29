import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

// Ensure the Axios instance uses the environment variable
axios.defaults.baseURL = API_URL;

