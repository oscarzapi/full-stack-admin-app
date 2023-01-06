import {CssBaseline, ThemeProvider} from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from 'theme';
import { BrowserRouter, Routes , Route, Navigate} from 'react-router-dom';
import Layout from 'scenes/layout'
import Dashboard from 'scenes/dashboard'
import Products from 'scenes/products'
import Customers from 'scenes/customers'
import Transactions from 'scenes/transactions'
import Geography from 'scenes/geography'

function App() {
  const mode = useSelector(state => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Routes>
          <Route element={<Layout></Layout>}>
            <Route path='/' element={<Navigate to='/dashboard' replace></Navigate>}></Route>
            <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
            <Route path='/products' element={<Products></Products>}></Route>
            <Route path='/customers' element={<Customers></Customers>}></Route>
            <Route path='/transactions' element={<Transactions></Transactions>}></Route>
            <Route path='/geography' element={<Geography></Geography>}></Route>

          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
