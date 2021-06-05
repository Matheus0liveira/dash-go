import { Button, HStack, Icon } from '@chakra-ui/react';
import { RiNotificationLine, RiUserLine } from 'react-icons/ri';

export default function NotificationsNav() {
  return (
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
  );
}
