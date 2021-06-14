import { darken } from "@chakra-ui/theme-tools";

const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    underlined: {
      mr: '4',
      p: '1',
      color: 'gray.600',
      borderRadius: '0',
      borderBottomWidth: '5px',
      borderBottomColor: 'white',
      borderTopWidth: '5px',
      borderTopColor: 'white',
      width: '8rem',
      fontSize: '14px',
      fontFamily: 'Poppins',
      fontWeight: '400',
      _hover: {
        borderBottomColor: 'primary',
        color: 'primary',
      },
      _active: {
        borderBottomColor: 'primary',
        color: 'primary',
      },
    },
    primary: {
      mr: '0',
      paddingY: '2',
      paddingX: '4',
      size: 'sm',
      width: '8rem',
      height: '2rem',
      borderRadius: 'lg',
      bg: 'primary',
      color: 'white',
      fontFamily: 'Poppins',
      fontWeight: '400',
      _hover: {
        bg: darken('primary', 10),
      },
    },
  },
};

export { ButtonStyles };
