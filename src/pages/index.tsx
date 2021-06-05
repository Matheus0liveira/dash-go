import { Flex, Button, Stack, Icon, HStack } from '@chakra-ui/react';
import { RiGithubLine, RiGoogleLine } from 'react-icons/ri';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from 'components/Form';

export type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        onSubmit={handleSubmit(handleSignIn)}
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Flex justify="center">
            <HStack spacing="4">
              <Button colorScheme="blackAlpha">
                <Icon as={RiGithubLine} fontSize="20" color="white" />
              </Button>
              <Button colorScheme="blackAlpha">
                <Icon as={RiGoogleLine} fontSize="20" color="white" />
              </Button>
            </HStack>
          </Flex>
          <Input
            name="email"
            label="E-mail"
            type="email"
            {...register('email')}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            {...register('password')}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
