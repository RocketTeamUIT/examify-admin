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
    light2: '#A9A7AC',
    bitDark: '#3F3F3F',
    quiteDark: '#323335',
  },
  greenAccent: {
    100: '#0f2922',
    200: '#1e5245',
    300: '#2e7c67',
    400: '#3da58a',
    500: '#4cceac',
    600: '#70d8bd',
    700: '#94e2cd',
    800: '#b7ebde',
    900: '#dbf5ee',
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
  palette: {
    primary: {
      main: colors.primary[500],
    },
    secondary: {
      main: colors.greenAccent[500],
    },
    background: {
      default: colors.grey[100],
    },
  },
});

export default theme;