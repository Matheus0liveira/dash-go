import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Matheus Oliveira</Text>
        <Text color="gray.300" fontSize="small">
          contato@matheus0liveira.con
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Matheus Oliveira"
        src="https://github.com/Matheus0liveira.png"
      />
    </Flex>
  );
}
