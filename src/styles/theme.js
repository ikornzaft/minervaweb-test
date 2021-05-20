import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from './buttonStyles';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    primary: "#16DCFF",
    secondary: "#888AE3",
    highlight: "#64FDFF",
    warning: "#AB59AA",
  },
  components: { 
    Button,
  },
});

export default theme;
