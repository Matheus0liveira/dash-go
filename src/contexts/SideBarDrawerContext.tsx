import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { createContext, useContext, useEffect } from 'react';

export type SideBarDrawerContextData = UseDisclosureReturn;

export type SideBarDrawerProviderProps = {
  children: React.ReactNode;
};

export const SideBarDrawerContext = createContext(
  {} as SideBarDrawerContextData
);

export default function SideBarDrawerProvider({
  children,
}: SideBarDrawerProviderProps) {
  const router = useRouter();

  const disclosure = useDisclosure();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SideBarDrawerContext.Provider value={{ ...disclosure }}>
      {children}
    </SideBarDrawerContext.Provider>
  );
}

export const useSideBarDrawer = (): SideBarDrawerContextData => {
  const context = useContext(SideBarDrawerContext);

  if (!context)
    throw new Error(
      'useSideBarDrawer must be used within a SideBarDrawerProvider'
    );

  return { ...context };
};
