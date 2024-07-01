import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import LandingPage from './Pages/LandingPage.jsx';
import Homepage from './Pages/Homepage.jsx';
import MasterProvider from './Context/Context.jsx';
import Sign from './Pages/Sign.jsx';
import Login from './Pages/Login.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
    ],
  },
  {
    path: '/homepage',
    element: <Homepage />,
  },
  {
    path: '/signup',
    element: <Sign />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MasterProvider>
      <RouterProvider router={router} />
    </MasterProvider>
  </React.StrictMode>
);
