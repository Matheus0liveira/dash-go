import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from '@chakra-ui/react';

export interface HeadingProps extends ChakraHeadingProps {
  children: React.ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return (
    <ChakraHeading size="lg" fontWeight="normal">
      {children}
    </ChakraHeading>
  );
}
