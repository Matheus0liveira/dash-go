import { Box, Button, HStack } from '@chakra-ui/react';
import PaginationItem from './PaginationItem';

export default function Pagination() {
  return (
    <HStack spacing="6" mt="8" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        <PaginationItem isCurrent number={1} />
        {[1, 2, 3, 4].map((number) => (
          <PaginationItem key={number} number={number} />
        ))}
      </HStack>
    </HStack>
  );
}
