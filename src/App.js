import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import TopNav from './TopNav';
import Map from './Map';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">     
            <TopNav/>
            <Map/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
