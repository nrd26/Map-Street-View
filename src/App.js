import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Body from './Body';
import TopNav from './TopNav';
import Map from './Map';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {/* <Grid minH="100vh" p={3}> */}
<TopNav/>
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          
          {/* <VStack spacing={8}> */}
            {/* <Body/> */}
            <Map/>
          {/* </VStack> */}
        {/* </Grid> */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
