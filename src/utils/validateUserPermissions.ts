import { User } from 'contexts/AuthContext';

export type ValidateUserPermissionsProps = {
  user: User;
  permissions: string[];
  roles: string[];
};

export default function validateUserPermissions({
  user,
  permissions,
  roles,
}: ValidateUserPermissionsProps) {
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
