import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASEURL || 'http://localhost:3000';
const baseAuthURL =
  process.env.NEXT_PUBLIC_BASEURL_AUTH || 'http://localhost:3333';

export const api = axios.create({
  baseURL,
});

export const authApi = axios.create({
  baseURL: baseAuthURL,
});
