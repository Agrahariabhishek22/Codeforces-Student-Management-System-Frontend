import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useState, createContext } from 'react';
   
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const Layout = ({ children }) => {
  const [mode, setMode] = useState('light');

  const colorMode = {
    toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
  };

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ padding: '16px' }}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
          {children}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
