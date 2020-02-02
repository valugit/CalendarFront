import axios from 'axios';
import secret from '../secret.js'

export const api = axios.create({
  baseURL: secret.apiUrl,
  timeOut: 1000,
  headers: {
    "Accept": "application/json"
  }
});