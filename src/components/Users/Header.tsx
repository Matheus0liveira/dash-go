import Link from 'next/link';
import {
  Flex,
  Spinner,
  HStack,
  IconButton,
  Button,
  Icon,
} from '@chakra-ui/react';
import { RiLoader4Line, RiAddLine } from 'react-icons/ri';

import { RefetchOptions, QueryObserverResult } from 'react-query';
import { GetUsersData } from 'services/hooks/useUsers';

import Heading from 'components/Heading';

export type HeaderUserProps = {
  title: string;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, unknown>>;
  isLoading?: boolean;
  isFetching?: boolean;
};

export default function HeaderUser({
  title,
  isLoading = false,
  isFetching = false,
  refetch,
}: HeaderUserProps) {
  return (
    <>
      <Flex as="header" mb="8" justify="space-between" align="center">
        <Heading>
          {title}
          {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )}
        </Heading>

        <HStack spacing="4">
          {refetch && (
            <IconButton
              aria-label="Reload users data"
              size="sm"
              fontSize="sm"
              colorScheme="purple"
              bg="purple.700"
              isLoading={!isLoading && isFetching}
              icon={<Icon as={RiLoader4Line} />}
              onClick={() => refetch()}
            />
          )}

          <Link href="/users/create" passHref>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Create user
            </Button>
          </Link>
        </HStack>
      </Flex>
    </>
  );
}
