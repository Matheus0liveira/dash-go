import { useAuth } from 'contexts/AuthContext';

export type UseCanProps = {
  permissions?: string[];
  roles?: string[];
};

export default function useCan({ permissions, roles }: UseCanProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length) {
    const hasAllPermissions = permissions.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles?.length) {
    const hasAllRoles = roles.every((role) => {
      return user.roles.includes(role);
    });

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}
