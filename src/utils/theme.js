import { createTheme } from '@mui/material/styles';

const pink = '#FFC0CB';
const lightblue = '#ADD8E6';
const purple = '#6415FF';
const black = '#000000';

const theme = createTheme({
  spacing: 8,
  palette: {
    common: {
      pink: pink,
      lightblue: lightblue,
      purple: purple,
      black: black,
    },
    primary: {
      main: purple,
      mainGradient: 'linear-gradient(to left, purple, pink)',
    },
    secondary: {
      main: lightblue,
      mainGradient: 'linear-gradient(to right, lightblue, pink)',
    },
  },
});

export default theme;
