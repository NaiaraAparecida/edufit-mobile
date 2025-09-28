import axios from 'axios';
import { Platform } from 'react-native';

const LOCAL_LAN = 'http://192.168.0.15:3000'; // se for usar aparelho físico, troque para o seu IP
const baseURL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000' // Android Emulator -> host
    : 'http://localhost:3000'; // iOS Simulator

export const api = axios.create({
  baseURL,            
  timeout: 12000,      
});

// (opcional) logs úteis
api.interceptors.response.use(
  r => r,
  err => {
    console.log('API_ERROR', {
      url: err.config?.url,
      baseURL: err.config?.baseURL,
      message: err.message,
      code: err.code,
    });
    return Promise.reject(err);
  }
);