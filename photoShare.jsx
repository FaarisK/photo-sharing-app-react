import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom/client';
import { Grid, Paper, Typography } from '@mui/material';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import './styles/main.css';
import TopBar from './components/TopBar';
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';
import UserPhotos from './components/UserPhotos';

function Home() {
  return (
    <Typography variant="body1">
      Welcome to the photo sharing app. Select a user from the list to view profile details
      and photos.
    </Typography>
  );
}

function Root() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <div className="main-topbar-buffer" />
        <Grid item xs={12} sm={3}>
          <Paper className="main-grid-item">
            <UserList />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className="main-grid-item">
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'users', element: <Navigate to="/" replace /> },
      { path: 'users/:userId', element: <UserDetail /> },
      { path: 'users/:userId/photos', element: <UserPhotos /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('photoshareapp'));
root.render(<RouterProvider router={router} />);
