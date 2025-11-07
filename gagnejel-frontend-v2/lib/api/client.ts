import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour ajouter le token JWT si présent
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API Functions
export const api = {
  // Users
  getUsers: () => apiClient.get('/users'),
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  createUser: (data: { walletAddress: string; username: string }) => 
    apiClient.post('/users', data),
  
  // Matches
  getMatches: () => apiClient.get('/matches'),
  getUpcomingMatches: () => apiClient.get('/matches/upcoming'),
  getMatch: (id: string) => apiClient.get(`/matches/${id}`),
  
  // Bets
  getBets: () => apiClient.get('/bets'),
  getUserBets: (userId: string) => apiClient.get(`/bets/user/${userId}`),
  placeBet: (data: {
    userId: string;
    matchId: string;
    type: string;
    prediction: string;
    amount: number;
    odds: number;
  }) => apiClient.post('/bets', data),
  
  // Blockchain
  getContractInfo: () => apiClient.get('/blockchain/contract/info'),
  getBalance: (address: string) => apiClient.get(`/blockchain/balance/${address}`),
  
  // Groups
  getGroups: () => apiClient.get('/groups'),
  getUserGroups: (userId: string) => apiClient.get(`/groups/user/${userId}`),
  createGroup: (data: { name: string; description: string; creatorId: string }) =>
    apiClient.post('/groups', data),
};

export default api;
