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
      hover: '#390e8f',
      mainGradient: 'linear-gradient(to left, purple, pink)',
    },
    secondary: {
      main: lightblue,
      mainGradient: 'linear-gradient(to right, lightblue, pink)',
    },
    tertiary: {
      main: '#1A202C',
      second: '#243E63',
      third: '#A0AEC0',
    },
  },
  // breakpoints: {
  //   values: {
  //     mobile: 0,
  //     tablet: 640,
  //     laptop: 1024,
  //     desktop: 1200,
  //   },
  // },
  // typography: {
  //   fontFamily: 'Segoe UI',
  // },
});

export default theme;
