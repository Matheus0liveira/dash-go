import { useQuery, UseQueryOptions } from 'react-query';
import { api } from 'services/axios';
import { queryClient } from 'services/reactQuery';

export type Users = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
export type GetUsersData = {
  totalCount: number;
  users: Users[];
};

export async function getUsers(page = 1): Promise<GetUsersData> {
  const { data, headers } = await api.get<GetUsersData>('/users', {
    params: {
      page,
    },
  });

  const totalCount = headers['x-total-count'];

  const users = data.users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));

  return {
    users,
    totalCount,
  };
}

export const getPrefetchUserById = async (userId: string) => {
  await queryClient.prefetchQuery(
    ['users', userId],
    async () => {
      const { data } = await api.get<GetUsersData>(`/users/${userId}`);

      return data;
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );
};

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    // ...options,
  });

  // console.log(teste);
  // return teste;
}
