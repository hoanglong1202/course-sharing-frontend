import Header from 'components/Header';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import MainPage from 'features/MainPage';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 4),
  },
  container: {
    maxWidth: '1280px',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container maxWidth="false" className={classes.container}>
        <Header />

        <MainPage />
      </Container>
    </Box>
  );
}

export default App;
