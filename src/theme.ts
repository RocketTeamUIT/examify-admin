import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: {
    100: '#cfdaf4',
    200: '#9fb5e9',
    300: '#6e90dd',
    400: '#3e6bd2',
    500: '#0e46c7',
    600: '#0b389f',
    700: '#082a77',
    800: '#061c50',
    900: '#030e28',
  },
  grey: {
    100: '#fdfdfd',
    200: '#fcfcfc',
    300: '#fafafa',
    400: '#f9f9f9',
    500: '#f7f7f7',
    600: '#c6c6c6',
    700: '#949494',
    800: '#636363',
    900: '#313131',
    light: '#D2D0D5',
  },
  components: {
    MuiButton: {
      variants: [],
    },
  },
};

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Helvetica, sans-serif',
  },
});

export default theme;
