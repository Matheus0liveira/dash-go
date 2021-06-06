import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASEURL || 'http://localhost:3000';

export const api = axios.create({
  baseURL,
});
