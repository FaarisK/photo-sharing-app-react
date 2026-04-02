import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import api from '../../lib/api';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get(`/user/${userId}`);
      setUser(response.data);
    }

    fetchUser();
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">
        {user.first_name}
        {' '}
        {user.last_name}
      </Typography>

      <Typography>
        Location:
        {' '}
        {user.location}
      </Typography>

      <Typography>
        Occupation:
        {' '}
        {user.occupation}
      </Typography>

      <Typography>
        Description:
        {' '}
        {user.description}
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to={`/users/${userId}/photos`}
      >
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;
