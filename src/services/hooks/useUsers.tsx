import { useQuery } from 'react-query';
import { api } from 'services/axios';

type Users = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
type Data = {
  users: Users[];
};

export async function getUsers() {
  const { data } = await api.get<Data>('/users');

  const users = data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));

  return users;
}

export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5, // 5 seconds
  });
}
