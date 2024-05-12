import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Login } from './components/pages/login/Login';
import { Registration } from './components/pages/registration/Registration';
import { HomePage } from './components/pages/home/HomePage';
import { ErrorPage } from './components/pages/error/ErrorPage';
import { AuthProvider } from './components/utils/AuthContext';
import { ProfilePage } from './components/pages/profile/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/registration',
    element: <Registration />,
    errorElement: <ErrorPage />
  },
  {
    path: '/user/me',
    element: <ProfilePage />,
    errorElement: <ErrorPage />
  },
  {
    path: 'user/:userId',
    element: <ProfilePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "*",
    element: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);
