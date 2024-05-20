import { createTheme } from '@mui/material/styles';

// experimented with MUI theme but probably unnecessary

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f5f7',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none'
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0e0e0',
        },
      },
    },
  },
});

export default theme;