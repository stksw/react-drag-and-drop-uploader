import {
  AppBar,
  Box,
  Container,
  createStyles,
  CssBaseline,
  IconButton,
  Link,
  makeStyles,
  ThemeProvider,
  Toolbar,
  Typography
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import React, { useState } from 'react';
import { darkTheme, lightTheme } from './theme';
import UploadPage from './pages/index';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

function App() {
  const classes = useStyles();
  const [theme, setTheme] = useState(darkTheme);

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar variant='dense'>
          <Typography variant="h6" className={classes.title}>
            Multiple File Upload
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Box marginTop={10}>
          <UploadPage />
        </Box>
      </Container>
    </>
  );
}

export default App;
