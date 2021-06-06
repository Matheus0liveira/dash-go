import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

import { Input } from 'components/Form';
import Header from 'components/Header';
import Heading from 'components/Heading';
import SideBar from 'components/Sidebar';
import { CreateUserSchema } from 'schemas/CreateUser';
import { queryClient } from 'services/reactQuery';
import { api } from 'services/axios';

export type CreateUserFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CreateUser() {
  const router = useRouter();

  const { handleSubmit, formState, register } = useForm({
    resolver: yupResolver(CreateUserSchema),
  });

  const { errors, isSubmitting } = formState;

  const createUser = useMutation(
    async (user: CreateUserFormData): Promise<CreateUserFormData> => {
      const { data } = await api.post<CreateUserFormData>('/users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
        >
          <Heading>Create user</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              {['fullName', 'email'].map((item) => (
                <Input
                  key={item}
                  error={errors[item]}
                  name={item}
                  label={item === 'fullName' ? 'Full Name' : 'E-mail'}
                  {...register(item)}
                />
              ))}
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              {['password', 'confirmPassword'].map((item) => (
                <Input
                  key={item}
                  error={errors[item]}
                  name={item}
                  label={item === 'fullName' ? 'Password' : 'Confirm Password'}
                  type="password"
                  {...register(item)}
                />
              ))}
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
