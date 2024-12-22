import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import '@mantine/core/styles.css';
import AppShellTest from './layout/AppShellTest';
import Home from './pages/Home';
import "@mantine/carousel/styles.css";
import About from './pages/About';
import Shop from './pages/Shop';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/admin/AdminDashcoard';
import AdminAppShell from './layout/AdminAppShell';
import NotFound from './pages/NotFound';
import AddProduct from './pages/admin/AddProduct';
import ViewProducts from './pages/admin/ViewProducts';
import ViewOrders from './pages/admin/ViewOrders';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { UserProvider } from './context/UserContext';
import Profile from './pages/Profile';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetail from './pages/ProductDetail';
import Basket from './pages/Basket';
import OrderProgress from './pages/OrderProgress';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'primary',

  colors: {

    primary: virtualColor({
      name: 'primary',
      dark: 'gray',
      light: 'dark'
    }),
    secenek: virtualColor({
      name: 'secenek',
      dark: "red",
      light: "blue"
    }),
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  }
});


function App() {


  return (

    <MantineProvider theme={theme} >
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShellTest />}>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/shop' element={<Shop />}></Route>
              <Route path='/products/:id' element={<ProductDetail />}></Route>
              <Route path='/contact-us' element={<ContactUs />}></Route>
              <Route path='/signin' element={<SignIn />}></Route>
              <Route path='/signup' element={<SignUp />}></Route>
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              /> 
              <Route
                path='/basket/order'
                element={
                  <ProtectedRoute>
                    <OrderProgress />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/basket'
                element={
                  <ProtectedRoute>
                    <Basket />
                  </ProtectedRoute>
                }
              />

            </Route>

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminAppShell />
                </AdminRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="view-products" element={<ViewProducts />} />
              <Route path="view-orders" element={<ViewOrders />} />
            </Route>

            <Route path="*" element={<NotFound />} />


          </Routes>



        </BrowserRouter>
      </UserProvider>
    </MantineProvider>

  )
}

export default App
