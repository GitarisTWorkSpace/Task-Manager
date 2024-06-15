import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Login } from './components/pages/login/Login';
import { HomePage } from './components/pages/home/HomePage';
import { ErrorPage } from './components/pages/error/ErrorPage';
import { AuthProvider } from './utils/AuthContext';
import { MyProfile } from './components/pages/myProfile/MyProfile';
import { TaskList } from './components/pages/taskList/TaskList';
import { autoAuth } from './utils/autoAuth';
import { TaskInfo } from './components/pages/taskInfo/TaskInfo';
import { ProfilePage } from './components/pages/userProfile/ProfilePage';
import { EditTask } from './components/pages/editTask/EditTask';
import { Registration } from './components/pages/registration/Registration';
import { AddTask } from './components/pages/addTask/AddTask';

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
  {
    path: 'user/:userId',
    element: <ProfilePage />,
    loader: autoAuth,
    errorElement: <ErrorPage />
  },
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
        path: "/task/add",
        element: <AddTask/>,
        loader: autoAuth,
      },
      {
        path: "/task/:taskId",
        element: <TaskInfo/>,
        loader: autoAuth,
      },
      {
        path: "/task/edit/:taskId",
        element: <EditTask />,
        loader: autoAuth,
      },
      {
        path: "/registration",
        element: <Registration />,
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
