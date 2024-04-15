import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchProducts = async () => {
    return axios.get(`${API_BASE_URL}/items`).then(response => response.data);
};

export const loginUser = async (credentials) => {
    return axios.post(`${API_BASE_URL}/users/login`, credentials).then(response => response.data);
};
