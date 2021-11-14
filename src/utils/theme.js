import { createTheme } from '@mui/material/styles';

const pink = '#FFC0CB';
const lightblue = '#ADD8E6';
const purple = '#800080';
const black = '#000000';

const theme = createTheme({
  spacing: 4,
  palette: {
    common: {
      pink: pink,
      lightblue: lightblue,
      purple: purple,
      black: black,
    },
    primary: {
      main: pink,
      mainGradient: 'linear-gradient(to left, purple, pink)',
    },
    secondary: {
      main: lightblue,
      mainGradient: 'linear-gradient(to right, lightblue, pink)',
    },
  },
});

export default theme;
