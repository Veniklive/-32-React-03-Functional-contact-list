import { createTheme } from '@mui/material/styles';

const coffeePalette = {
  light: '#d7a86e',
  main: '#8b5e3c',
  dark: '#5c3b26',
  darker: '#3b2a20',
};

export const coffyTheme = createTheme({
  palette: {
    primary: {
      light: coffeePalette.light,
      main: coffeePalette.main,
      dark: coffeePalette.dark,
      darker: coffeePalette.darker,
      contrastText: '#fff',
    },
    secondary: {
      main: '#974d19ff',
    },
  },
});
