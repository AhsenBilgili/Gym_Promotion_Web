import './App.css';
import theme from "./theme";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';

function App(){
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
      <Outlet/>
      </div>
    </ThemeProvider>
  );
  }

export default App;
