import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import SideBer from './Components/Sideber/SideBer';
import PendingTransaction from './Components/Transactions/PendingTransaction';
import CreateAccount from './Components/LoginRegistration/CreateAccount';
import Error from './Components/Error/Error';
import Dashboard from './Components/Dashboard/Dashboard';
import Market from './Components/Market/Market';
import KYCrequect from './Components/KYC/KYCrequect';
import UserDetails from './Components/Users/User';
import Transactions from './Components/Transactions/Transactions';
import Login from './Components/LoginRegistration/Login';
import UpdateAdmin from './Components/LoginRegistration/UpdateAdmin';
import QRcode from './Components/QRcode/QRcode';

// Layout Component with Sidebar
const Layout = () => (
  <div className="flex">
    <SideBer />
    <Outlet />
  </div>
);

// Define Routes
const route = createBrowserRouter([
  {
    path: '*',
    element: <Error />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/updateAdmin/:id',
    element: <UpdateAdmin />
  },
  {
    path: '/createAccount',
    element: <CreateAccount />
  },
  {
    path: '/', // Routes with Sidebar
    element: <Layout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/market', element: <Market /> },
      { path: '/kyc', element: <KYCrequect /> },
      { path: '/userDetails', element: <UserDetails /> },
      { path: '/transactions', element: <Transactions /> },
      { path: '/pendingTransactions', element: <PendingTransaction /> },
      { path: '/qrCode', element: <QRcode /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
