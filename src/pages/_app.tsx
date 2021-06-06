import { ChakraProvider } from '@chakra-ui/react';
import SideBarDrawerProvider from 'contexts/SideBarDrawerContext';
import { AppProps } from 'next/app';
import { makeServer } from 'services/mirage';
import { theme } from 'styles/theme';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from 'services/reactQuery';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SideBarDrawerProvider>
          <Component {...pageProps} />
        </SideBarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
