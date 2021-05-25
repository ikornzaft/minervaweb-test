import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './app';
import theme from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={'/novoa/minerva-test'}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
