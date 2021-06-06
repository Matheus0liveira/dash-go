import { Button, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export interface PaginationItemProps extends ChakraButtonProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export default function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
  ...rest
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        _disabled={{
          bg: 'pink.500',
          cursor: 'default',
        }}
        _hover={{
          cursor: 'default',
        }}
        {...rest}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="pink"
      bg="gray.700"
      _hover={{
        bg: 'gray.500',
      }}
      onClick={() => onPageChange(number)}
      {...rest}
    >
      {number}
    </Button>
  );
}
