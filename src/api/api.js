import axios from 'axios';

const api = axios.create({
  // Se estiver rodando localmente use a porta definida no server.js (3000)
  baseURL: 'https://candi-api.onrender.com/api', 
});

export default api;