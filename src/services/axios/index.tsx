import axios from 'axios';
import { parseCookies } from 'nookies';

const baseURL = process.env.NEXT_PUBLIC_BASEURL || 'http://localhost:3000';
const baseAuthURL =
  process.env.NEXT_PUBLIC_BASEURL_AUTH || 'http://localhost:3333';

export const api = axios.create({
  baseURL,
});

const { 'dashgo.token': token } = parseCookies();

export const authApi = axios.create({
  baseURL: baseAuthURL,
  headers: {
    Authorization: `Bearer: ${token}`,
  },
});
