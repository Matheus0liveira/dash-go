import { Box, Stack, HStack, Text } from '@chakra-ui/react';
import { generatePageArray } from 'helpers/generatePageArray';
import PaginationItem from './PaginationItem';

export type PaginationProps = {
  totalCountOfRegister: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const siblingsCount = 1;

export default function Pagination({
  currentPage = 1,
  onPageChange,
  registersPerPage = 10,
  totalCountOfRegister,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegister / registersPerPage);

  const previousPage =
    currentPage > 1
      ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPage =
    currentPage < lastPage
      ? generatePageArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={['column', 'row']}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}
        {console.log(previousPage)}
        {previousPage.length &&
          previousPage.map((page) => (
            <PaginationItem key={page} number={page} />
          ))}

        <PaginationItem isCurrent number={currentPage} />

        {nextPage.length > 0 &&
          nextPage.map((page) => <PaginationItem key={page} number={page} />)}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} />
          </>
        )}
      </HStack>
    </Stack>
  );
}
