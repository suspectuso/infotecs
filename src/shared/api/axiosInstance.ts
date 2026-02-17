import axios from 'axios';
import { BASE_URL } from '@shared/config/apiConfig';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});
