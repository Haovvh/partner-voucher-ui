import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductCategory from './pages/productcategory/productcategory';
import ProductItem from './pages/productitem/productitem';
import ProductsPage from './pages/product/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Game from './pages/games/Games';
import Voucher from './pages/vouchers/Vouchers';
import Conpaign from './pages/conpaigns/conpaign';
import Service from './services/header.service';
import PageRole from './pages/PageRole';
import Store from './pages/store/Stores';
import User from './pages/user/Users';


// ----------------------------------------------------------------------

export default function Router() {
  const isUser = (Service.GetUser() && Service.GetUser().success && Service.GetUser().data && Service.GetUser().data.token)
  const routes = useRoutes([
    {
      path: '',
      element: (isUser)? <DashboardLayout /> : <SimpleLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: (isUser)? <DashboardAppPage /> :<PageRole />},
        { path: 'game', element: (isUser)? <Game /> :<PageRole /> },
        { path: 'voucher', element: (isUser)? <Voucher /> :<PageRole />},
        { path: 'conpaign', element: (isUser)? <Conpaign /> :<PageRole/>},
        { path: 'productcategory', element: (isUser)? <ProductCategory /> :<PageRole/>},
        { path: 'productitem', element: (isUser)? <ProductItem /> :<PageRole/>},
        { path: 'products', element: (isUser)? <ProductsPage /> :<PageRole/>},
        { path: 'store', element: (isUser)? <Store /> :<PageRole/>},
        { path: 'user', element: (isUser)? <User /> :<PageRole/>},
        { path: 'logout', element: (isUser)? <Logout /> :<PageRole/>},
        { path: 'profile', element: (isUser)? <Profile /> :<PageRole/>},
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },    
    
    {
      path: 'register',
      element: <RegisterPage />,
    },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
