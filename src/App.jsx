import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SideBer from './Components/Sideber/SideBer';

// Lazy Load Components for Performance
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'));
const Market = lazy(() => import('./Components/Market/Market'));
const KYCrequect = lazy(() => import('./Components/KYC/KYCrequect'));
const User = lazy(() => import('./Components/Users/User'));
const Transactions = lazy(() => import('./Components/Transactions/Transactions'));

// Layout Component with Sidebar
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
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/market', element: <Market /> },
      { path: '/kyc', element: <KYCrequect /> },
      { path: '/users', element: <User /> },
      { path: '/transactions', element: <Transactions /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
