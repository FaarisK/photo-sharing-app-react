import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation, matchPath } from 'react-router-dom';
import api from '../../lib/api';

function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState('Photo Sharing App');

  useEffect(() => {
    async function fetchContext() {
      const photoMatch = matchPath('/users/:userId/photos', location.pathname);
      const detailMatch = matchPath('/users/:userId', location.pathname);

      if (!photoMatch && !detailMatch) {
        setContextText('Browse Users');
        return;
      }

      const userId = photoMatch?.params?.userId || detailMatch?.params?.userId;

      try {
        const response = await api.get(`/user/${userId}`);
        const user = response.data;
        const name = `${user.first_name} ${user.last_name}`;

        if (photoMatch) {
          setContextText(`Photos of ${name}`);
        } else {
          setContextText(name);
        }
      } catch (error) {
        setContextText('Photo Sharing App');
      }
    }

    fetchContext();
  }, [location.pathname]);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Faaris Khan</Typography>
        <Typography variant="h6">{contextText}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
