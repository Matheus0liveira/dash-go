import useCan from 'hooks/useCan';

export type CanProps = {
  permissions?: string[];
  roles?: string[];
  children: React.ReactNode;
};

export default function Can({ permissions, roles, children }: CanProps) {
  const userCanSeeComponent = useCan({ permissions, roles });

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}
