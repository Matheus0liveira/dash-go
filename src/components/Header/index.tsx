import {
  Flex,
  Text,
  Input,
  Icon,
  HStack,
  Button,
  Box,
  Avatar,
} from '@chakra-ui/react';
import { RiNotificationLine, RiSearchLine, RiUserLine } from 'react-icons/ri';

export default function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>
      <Flex
        as="span"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxW={400}
        alignSelf="center"
        color="gray.200"
        pos="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: 'gray.400' }}
        />

        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.100"
        >
          <Button bg="transparent" _hover={{ bg: 'gray.600' }}>
            <Icon as={RiNotificationLine} fontSize="20" />
          </Button>
          <Button bg="transparent" _hover={{ bg: 'gray.600' }}>
            <Icon as={RiUserLine} fontSize="20" />
          </Button>
        </HStack>

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
      </Flex>
    </Flex>
  );
}
