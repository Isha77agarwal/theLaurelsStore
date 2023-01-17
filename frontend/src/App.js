import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  }, {
    path: "product/:product",
    element: <ProductScreen />
  }
])
const theme = createTheme({
  palette: {
    primary: {
      main: '#333652',
      light: '#5e607e',
      dark: '#0c1029',
      contrastText: '#e9eaec'
    },
    secondary: {
      main: '#fad02c',
      light: '#ffff64',
      dark: '#F0C82B',
      contrastText: '#000'
    },
    neutral: {
      main: '#E9EAEC',
      contrastText: '#333652'
    }
  },
  typography: {
    fontFamily: [
      'sans-serif'
    ]
  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
