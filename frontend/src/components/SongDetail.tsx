import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Typography from '@mui/material/Typography';

interface SongDetailProps {
  songId: string;
}

const SongDetail: React.FC<SongDetailProps> = ({ songId }) => {
  const song = useSelector((state: RootState) => state.songs.songs.find((song) => song._id === songId));

  if (!song) return <Typography variant="body1">Song not found</Typography>;

  return (
    <div>
      <Typography variant="h2">{song.title}</Typography>
      <Typography variant="body1">Artist: {song.artist}</Typography>
      <Typography variant="body1">Album: {song.album}</Typography>
      <Typography variant="body1">Genre: {song.genre}</Typography>
    </div>
  );
};

export default SongDetail;
