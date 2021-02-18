import { ChakraProvider } from '@chakra-ui/react';

const CustomApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default CustomApp;
