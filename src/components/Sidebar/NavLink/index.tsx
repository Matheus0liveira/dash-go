import {
  Link,
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

export interface NavLinkProps extends ChakraLinkProps {
  children: string;
  icon: React.ElementType;
}

export default function NavLink({ children, icon, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
