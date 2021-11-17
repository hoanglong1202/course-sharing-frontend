import Header from 'components/Header';
import SideBar from 'components/SideBar';
import test from 'assets/test.jpg';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <Header />
    </>
  );
}

export default App;
