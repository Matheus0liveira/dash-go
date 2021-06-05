import { Box, Text, Stack, Icon } from '@chakra-ui/react';

export type NavLinkProps = {
  name: string;
  children: React.ReactNode;
};

export default function NavSection({ name, children }: NavLinkProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">
        {name.toUpperCase()}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
