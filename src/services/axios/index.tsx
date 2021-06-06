import { ThemeContext } from '@emotion/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { parseCookies, setCookie } from 'nookies';

export type FailedRequestsQueue = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

const baseURL = process.env.NEXT_PUBLIC_BASEURL || 'http://localhost:3000';
const baseAuthURL =
  process.env.NEXT_PUBLIC_BASEURL_AUTH || 'http://localhost:3333';

export const api = axios.create({
  baseURL,
});

let cookies = parseCookies();

let isRefreshing = false; // Identifies whether you are updating the token or no

let failedRequestsQueue = [] as FailedRequestsQueue[]; // Storing requests failure

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
        cookies = parseCookies();

        const { 'dashgo.refreshToken': refreshToken } = cookies;

        const originalConfig = error.config; // Total config for connection with back-end

        if (!isRefreshing) {
          isRefreshing = true;

          authApi
            .post('/refresh', {
              refreshToken,
            })
            .then(({ data }) => {
              setCookie(undefined, 'dashgo.token', data.token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              });

              setCookie(undefined, 'dashgo.refreshToken', data.refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              });

              authApi.defaults.headers[
                'Authorization'
              ] = `Bearer ${data.token}`;

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(data.token)
              );

              failedRequestsQueue = [];
            })
            .catch((error: AxiosError) => {
              failedRequestsQueue.forEach((request) =>
                request.onFailure(error)
              );

              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`;

                resolve(authApi(originalConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        }
      } else {
        //LogOut
      }
    }
  }
);
