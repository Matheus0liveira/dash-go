import {
  Icon,
  Text,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import ActiveLink from 'components/ActiveLink';
import Link from 'next/link';
export interface NavLinkProps extends ChakraLinkProps {
  children: string;
  icon: React.ElementType;
  href: string;
}

export default function NavLink({
  children,
  icon,
  href,
  ...rest
}: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
