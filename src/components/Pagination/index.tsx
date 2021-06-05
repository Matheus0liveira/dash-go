import { Box, Button, HStack } from '@chakra-ui/react';

export default function Pagination() {
  return (
    <HStack spacing="6" mt="8" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          disabled
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          1
        </Button>
        {[1, 2, 3, 4].map((item) => (
          <Button
            key={item}
            size="sm"
            fontSize="xs"
            width="4"
            colorScheme="pink"
            bg="gray.700"
            _hover={{
              bg: 'gray.500',
            }}
          >
            {item}
          </Button>
        ))}
      </HStack>
    </HStack>
  );
}
