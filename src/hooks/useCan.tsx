import { useAuth } from 'contexts/AuthContext';
import validateUserPermissions from 'utils/validateUserPermissions';

export type UseCanProps = {
  permissions?: string[];
  roles?: string[];
};

export default function useCan({ permissions, roles }: UseCanProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}
