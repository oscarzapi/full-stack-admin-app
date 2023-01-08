import {CssBaseline, ThemeProvider} from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { lazy, useMemo } from 'react';
import { themeSettings } from 'theme';
import { BrowserRouter, Routes , Route, Navigate} from 'react-router-dom';


const Dashboard = lazy(() => import('scenes/dashboard'))
const Layout = lazy(() => import('scenes/layout'))
const Products = lazy(() => import('scenes/products'))
const Customers = lazy(() => import('scenes/customers'))
const Transactions = lazy(() => import('scenes/transactions'))
const Geography = lazy(() => import('scenes/geography'))
const Overview = lazy(() => import('scenes/overview'))
const Daily = lazy(() => import('scenes/daily'))
const Monthly = lazy(() => import('scenes/monthly'))
const Breakdown = lazy(() => import('scenes/breakdown'))
const Admin = lazy(() => import('scenes/admin'))
const Predictions = lazy(() => import('scenes/predictions'))

/* import Dashboard from 'scenes/dashboard'
import Products from 'scenes/products'
import Customers from 'scenes/customers'
import Transactions from 'scenes/transactions'
import Geography from 'scenes/geography'
import Overview from 'scenes/overview';
import Daily from 'scenes/daily';
import Monthly from 'scenes/monthly';
import Breakdown from 'scenes/breakdown';
import Admin from 'scenes/admin'
import Predictions from 'scenes/predictions' */

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
            <Route path='/overview' element={<Overview></Overview>}></Route>
            <Route path='/daily' element={<Daily></Daily>}></Route>
            <Route path='/monthly' element={<Monthly></Monthly>}></Route>
            <Route path='/breakdown' element={<Breakdown></Breakdown>}></Route>
            <Route path='/admin' element={<Admin></Admin>}></Route>
            <Route path='/predictions' element={<Predictions></Predictions>}></Route>
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
