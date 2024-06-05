// src/components/EditSongFormModal.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface EditSongFormModalProps {
  open: boolean;
  onClose: () => void;
  songId: string;
}

const EditSongFormModal: React.FC<EditSongFormModalProps> = ({ open, onClose, songId }) => {
  const dispatch = useDispatch();
  const song = useSelector((state: RootState) => state.songs.songs.find((song) => song._id === songId));

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setArtist(song.artist);
      setAlbum(song.album);
      setGenre(song.genre);
    }
  }, [song]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'songs/editSong',
      payload: { _id: songId, title, artist, album, genre },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Song</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              label="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              label="Album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              label="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              variant="outlined"
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditSongFormModal;
