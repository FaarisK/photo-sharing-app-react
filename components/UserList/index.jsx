import React, { useEffect, useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get('/user/list');
      setUsers(response.data);
    }

    fetchUsers();
  }, []);

  return (
    <List>
      {users.map((user) => (
        <ListItemButton
          key={user._id}
          component={Link}
          to={`/users/${user._id}`}
        >
          <ListItemText
            primary={`${user.first_name} ${user.last_name}`}
          />
        </ListItemButton>
      ))}
    </List>
  );
}

export default UserList;
