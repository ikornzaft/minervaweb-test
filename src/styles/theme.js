import { extendTheme } from '@chakra-ui/react';
import { theme as chakraTheme } from '@chakra-ui/react';
import { createBreakPoints } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';
import { ButtonStyles as Button } from './components/buttonStyles';

const colors = {
  ...chakraTheme.colors,
  primary: '#1EA5FC',
  primary_light: '#81CCFD',
  area1: '#005BFF',
  area2: '#FF3152',
  area3: '#05CE91',
  area4: '#8F00FF',
  area5: '#FCDF03',
};

const fonts = {
  ...chakraTheme.fonts,
  body: 'Open Sans',
  heading: 'Poppins',
};

const components = {
  ...chakraTheme.components,
  Button,
  Popover: {
    variants: {
      wide: {
        popper: {
          width: '400px',
          height: '400px',
        },
      },
      extraheight: {
        popper: {
          width: '400px',
          height: '500px',
        },
      },
    },
  },
};

const overrides = {
  ...chakraTheme,
  fonts,
  colors,
  components,
};

const customTheme = extendTheme(overrides);

export default customTheme;
