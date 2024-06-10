import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Login } from './components/pages/login/Login';
import { HomePage } from './components/pages/home/HomePage';
import { ErrorPage } from './components/pages/error/ErrorPage';
import { AuthProvider } from './utils/AuthContext';
import { MyProfile } from './components/pages/profile/MyProfile';
import { TaskList } from './components/pages/taskList/TaskList';
import { autoAuth } from './utils/autoAuth';
import { TaskInfo } from './components/pages/taskInfo/TaskInfo';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/user/me',
    element: <MyProfile />,
    loader: autoAuth,
    errorElement: <ErrorPage />
  },
  // {
  //   path: 'user/:userId',
  //   element: <ProfilePage />,
  //   errorElement: <ErrorPage />
  // },
  {
    path: "/",
    element: <HomePage />,
    loader: autoAuth,
    children: [
      {
        path: "/tasks",
        element: <TaskList/>,
        loader: autoAuth,
      },
      {
        path: "/task/:taskId",
        element: <TaskInfo/>,
        loader: autoAuth,
      }
    ],
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
