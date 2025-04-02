import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SideBer from './Components/Sideber/SideBer';
import PendingTransaction from './Components/Transactions/PendingTransaction';
import CreateAccount from './Components/LoginRegistration/CreateAccount';

const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'));
const Market = lazy(() => import('./Components/Market/Market'));
const KYCrequect = lazy(() => import('./Components/KYC/KYCrequect'));
const User = lazy(() => import('./Components/Users/User'));
const Transactions = lazy(() => import('./Components/Transactions/Transactions'));
const Login = lazy(() => import('./Components/LoginRegistration/Login'));
const UpdateAdmin = lazy(() => import('./Components/LoginRegistration/UpdateAdmin'));

// Layout Component with Sidebar (used only for authenticated routes)
const Layout = () => (
  <div className="flex">
    <SideBer />
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  </div>
);

// Define Routes
const route = createBrowserRouter([
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
      { path: '/users', element: <User /> },
      { path: '/transactions', element: <Transactions /> },
      { path: '/pendingTransactions', element: <PendingTransaction /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
