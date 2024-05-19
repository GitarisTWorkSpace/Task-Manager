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
import { ProjectList } from './components/pages/projectsList/ProjectList';
import { DiagramGant } from './components/pages/diagram/DiagramGant';
import { TaskList } from './components/pages/taskList/TaskList';
import { KanbanBoard } from './components/pages/kanbanBoard/KanbanBoard';
import { MainPage } from './components/pages/main/MainPage';

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
    children: [
      {
        path: "/main",
        element: <MainPage />
      },
      {
        path: "/projects",
        element: <ProjectList />
      },
      {
        path: "/tasks",
        element: <TaskList/>
      },
      {
        path: "/diagram",
        element: <DiagramGant />
      },
      {
        path: "/kanban",
        element: <KanbanBoard />
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
