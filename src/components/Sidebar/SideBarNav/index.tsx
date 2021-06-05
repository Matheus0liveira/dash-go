import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import NavLink from '../NavLink';
import NavSection from '../NavSection';

export default function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection name="GERAL">
        <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink icon={RiContactsLine}>Users</NavLink>
      </NavSection>

      <NavSection name="AUTOMATION">
        <NavLink icon={RiInputMethodLine}>Forms</NavLink>
        <NavLink icon={RiGitMergeLine}>Automation</NavLink>
      </NavSection>
    </Stack>
  );
}
