import axios, { AxiosError, AxiosResponse } from 'axios';
import { parseCookies, setCookie } from 'nookies';

const baseURL = process.env.NEXT_PUBLIC_BASEURL || 'http://localhost:3000';
const baseAuthURL =
  process.env.NEXT_PUBLIC_BASEURL_AUTH || 'http://localhost:3333';

export const api = axios.create({
  baseURL,
});

let cookies = parseCookies();

export const authApi = axios.create({
  baseURL: baseAuthURL,
  headers: {
    Authorization: `Bearer: ${cookies['dashgo.token']}`,
  },
});

authApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        (async () => {
          cookies = parseCookies();

          const { 'dashgo.refreshToken': refreshToken } = cookies;

          const response = await authApi.post('/refresh', {
            refreshToken,
          });
          console.log(response);

          setCookie(undefined, 'dashgo.token', response.data.token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
          });
          setCookie(
            undefined,
            'dashgo.refreshToken',
            response.data.refreshToken,
            {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            }
          );

          authApi.defaults.headers[
            'Authorization'
          ] = `Bearer ${response.data.token}`;
        })();
      } else {
        //LogOut
      }
    }
  }
);
