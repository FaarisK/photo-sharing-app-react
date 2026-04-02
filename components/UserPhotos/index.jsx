import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import api from '../../lib/api';

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await api.get(`/photosOfUser/${userId}`);
        setPhotos(response.data || []);
      } catch (error) {
        setPhotos([]);
      }
    }

    fetchPhotos();
  }, [userId]);

  if (photos === null) {
    return <Typography>Loading...</Typography>;
  }

  if (photos.length === 0) {
    return <Typography>No photos found for this user.</Typography>;
  }

  return (
    <Box>
      {photos.map((photo) => (
        <Box key={photo._id} sx={{ marginBottom: 4 }}>
          <img
            src={`/images/${photo.file_name}`}
            alt="User upload"
            style={{ width: '100%', maxWidth: '600px', display: 'block' }}
          />

          <Typography sx={{ marginTop: 1, marginBottom: 2 }}>
            {new Date(photo.date_time).toLocaleString()}
          </Typography>

          <Typography variant="h6">Comments</Typography>

          {(photo.comments || []).length > 0 ? (
            (photo.comments || []).map((comment) => (
              <Box key={comment._id} sx={{ marginBottom: 2, paddingLeft: 2 }}>
                <Typography variant="body2">
                  {new Date(comment.date_time).toLocaleString()}
                </Typography>

                <Typography variant="body1">
                  <Link to={`/users/${comment.user._id}`}>
                    {comment.user.first_name}
                    {' '}
                    {comment.user.last_name}
                  </Link>
                  :
                  {' '}
                  {comment.comment}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No comments.</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default UserPhotos;
