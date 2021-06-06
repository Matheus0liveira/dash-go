import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useState } from 'react';
import { authApi } from 'services/axios';

export type User = {
  email: string;
  permissions: string;
  roles: string[];
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

export default function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  const [user, setUser] = useState<User>();

  const router = useRouter();

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await authApi.post<User>('/sessions', {
        email,
        password,
      });

      setUser({ email, ...data });

      router.push('/dashboard');
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
