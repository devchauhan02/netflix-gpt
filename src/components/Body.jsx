import React from 'react';
import Login from './Login';
import Browse from './Browse';
import ProfileSelector from './ProfileSelector';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/profile', element: <ProfileSelector /> },
    { path: '/browse', element: <Browse /> },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
