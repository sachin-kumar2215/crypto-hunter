import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCryptoState } from '../CryptoContext';
import CssBaseline from '@mui/material/CssBaseline';
const Header = () => {
  const navigate = useNavigate();
  let { currency, setCurrency } = useCryptoState();
  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <AppBar color='transparent' position='static'>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate('/')}
              style={{
                flex: 1,
                color: 'gold',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              variant='h6'
            >
              Crypto-hunter
            </Typography>
            <Select
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </ThemeProvider>
    </AppBar>
  );
};

export default Header;
