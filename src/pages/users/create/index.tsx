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

import { Input } from 'components/Form';
import Header from 'components/Header';
import Heading from 'components/Heading';
import SideBar from 'components/Sidebar';
import { CreateUserSchema } from 'schemas/CreateUser';

export type CreateUserFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CreateUser() {
  const { handleSubmit, formState, register } = useForm({
    resolver: yupResolver(CreateUserSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
              {['Password', 'confirmPassword'].map((item) => (
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
