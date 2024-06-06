import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectTotalSongs,
  selectTotalArtists,
  selectTotalAlbums,
  selectTotalGenres,
  selectSongsByGenre,
  selectSongsAndAlbumsByArtist,
  selectSongsByAlbum,
} from './selectors';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./songlist.scss"

const Statistics: React.FC = () => {
  const totalSongs = useSelector(selectTotalSongs);
  const totalArtists = useSelector(selectTotalArtists);
  const totalAlbums = useSelector(selectTotalAlbums);
  const totalGenres = useSelector(selectTotalGenres);
  const songsByGenre = useSelector(selectSongsByGenre);
  const songsAndAlbumsByArtist = useSelector(selectSongsAndAlbumsByArtist);
  const songsByAlbum = useSelector(selectSongsByAlbum);

  return (
    <div className="statics">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography className="typography">View Overall Statistics:-</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 850 }} aria-label="simple table" >
                <TableHead className='thead'>
                  <TableRow>
                    <TableCell>Statistics</TableCell>
                    <TableCell align="left">Songs by Genre</TableCell>
                    <TableCell align="left">Songs and Albums by Artist</TableCell>
                    <TableCell align="left">Songs by Album</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className='tbody'>
                  <TableRow className='tbody'>
                    <TableCell  align="left">
                      <div>Total Songs: {totalSongs}</div>
                      <div>Total Artists: {totalArtists}</div>
                      <div>Total Albums: {totalAlbums}</div>
                      <div>Total Genres: {totalGenres}</div>
                    </TableCell>
                    <TableCell align="left">
                      <ul>
                        {Object.entries(songsByGenre).map(([genre, count]) => (
                          <li key={genre}>{genre}: {count}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell align="left">
                      <ul>
                        {Object.entries(songsAndAlbumsByArtist).map(([artist, data]) => (
                          <li key={artist}>
                            {artist}: {data.songs} songs, {data.albums.size} albums
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell align="left">
                      <ul>
                        {Object.entries(songsByAlbum).map(([album, count]) => (
                          <li key={album}>{album}: {count}</li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Statistics;