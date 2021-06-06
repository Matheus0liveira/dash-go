import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { authApi } from 'services/axios';

export type User = {
  email: string;
  permissions: string;
  roles: string[];
};

export type PostAuthSession = {
  user: User;
  token: string;
  refreshToken: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthContextData = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  isAuthenticated: boolean;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  destroyCookie(undefined, 'dashgo.token');
  destroyCookie(undefined, 'dashgo.refreshToken');

  Router.push('/');
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        const { 'dashgo.token': token } = parseCookies();

        if (token) {
          const response = await authApi.get<User>('/me');

          setUser(response?.data);
        }
      } catch {
        signOut();
      }
    })();
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await authApi.post<PostAuthSession>('/sessions', {
        email,
        password,
      });

      const { token, refreshToken, user } = data;

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({ email, ...user });

      authApi.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAth must be used within a AuthProvider');

  return { ...context };
};
