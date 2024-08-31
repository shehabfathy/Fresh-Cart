import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Category from './Components/Category/Category';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import Products from './Components/Products/Products';
import { userToken } from './Context/Token';
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute';
import { AuthRoute } from './Components/ProtectedRoute/AuthRoute';
import Details from './Components/Details/Details';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';

function App() {
  const { setToken } = useContext(userToken);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'category', element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'login', element: <AuthRoute><Login /></AuthRoute> },
        { path: 'register', element: <AuthRoute><Register /></AuthRoute> },
        {path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
        {path:'checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
        {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},

        { path: '*', element: <Notfound /> },
      ],
    }
    
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
