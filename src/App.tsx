import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { routes } from './routes';
import './index.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    typography: {
      fontFamily: string;
    };
  }
  // allow configuration using `createTheme`
  interface TypographyOptions {
    typography?: {
      fontFamily?: string;
    };
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
