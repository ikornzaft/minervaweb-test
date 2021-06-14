import { extendTheme } from '@chakra-ui/react';
import { theme as chakraTheme } from '@chakra-ui/react';
import { createBreakPoints } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';
import { ButtonStyles as Button } from './components/buttonStyles';

const colors = {
  ...chakraTheme.colors,
  primary: '#1EA5FC',
  secondary: '#FF6F91',
  highlight: '#00C9A7',
  warning: '#FFC75F',
  danger: '#C34A36',
};

const fonts = {
  ...chakraTheme.fonts,
  body: 'Open Sans',
  heading: 'Poppins',
};

const components = {
  ...chakraTheme.components,
  Button,
}

const overrides = {
  ...chakraTheme,
  fonts,
  colors,
  components,
};

const customTheme = extendTheme(overrides);

export default customTheme;
