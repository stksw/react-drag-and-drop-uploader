import { createTheme } from '@material-ui/core/styles';

// Create a light theme instance.
export const lightTheme = createTheme();

// Create a dark theme instance.
export const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});