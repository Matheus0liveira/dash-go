import { ChakraProvider } from '@chakra-ui/react';
import SideBarDrawerProvider from 'contexts/SideBarDrawerContext';
import { AppProps } from 'next/app';
import { makeServer } from 'services/mirage';
import { theme } from 'styles/theme';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SideBarDrawerProvider>
        <Component {...pageProps} />
      </SideBarDrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
