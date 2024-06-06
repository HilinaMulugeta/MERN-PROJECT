import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchSongsAction } from '../actions/songActions';
import { RootState } from '../store';
import "./songlist.scss";
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import SongFormModal from './SongForm';
import Statistics from './Statistics';  // Import the Statistics component
import EditSongFormModal from './EditSongForm';
import { Alert, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [editingSong, setEditingSong] = useState<string | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [songToDelete, setSongToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSongsAction());
  }, [dispatch]);

  const handleEdit = (songId: string) => {
    setEditingSong(songId);
    setEditModalOpen(true);
  };

  const handleDelete = (songId: string) => {
    setSongToDelete(songId);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (songToDelete) {
      dispatch({ type: 'songs/removeSong', payload: songToDelete });
      setShowConfirmation(false);
      setSongToDelete(null);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSongToDelete(null);
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 150 ,headerClassName: 'x'},
    { field: 'artist', headerName: 'Artist', flex: 1, minWidth: 150 ,headerClassName: 'x'},
    { field: 'album', headerName: 'Album', flex: 1, minWidth: 150 ,headerClassName: 'x' },
    { field: 'genre', headerName: 'Genre', flex: 1, minWidth: 150 ,headerClassName: 'x' },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1, minWidth: 150,headerClassName: 'x',
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row._id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = songs.map((song) => ({
    ...song,
    id: song._id,
  }));

  return (
    <div className="song-list">
      <div className="box box3">
        <div className='alert'>
          {showConfirmation && (
            <Stack sx={{ width: '100%' }} spacing={1}>
              <Alert severity="warning">
                <p>Are you sure you want to delete?</p>
                <button onClick={handleConfirm}>Yes</button>
                <button onClick={handleCancel}>No</button>
              </Alert>
            </Stack>
          )}
        </div>
      </div>
      <div className="box box2">
        <Button
          component="label"
          className='button'
          role={undefined}
          variant="contained"
          tabIndex={-1}
          onClick={() => setAddModalOpen(true)} sx={{ mt: 2 }}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </div>
      <div className="dataTable">
        <div className="dataTable-wrapper">
          <div className="box box1">
            <DataGrid
              className="dataGrid"
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 30]}
              checkboxSelection
              disableRowSelectionOnClick
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
            />
            <SongFormModal open={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            {editingSong && (
              <EditSongFormModal open={isEditModalOpen} songId={editingSong} onClose={() => setEditModalOpen(false)} />
            )}
          </div>
          <div className="box box4">
            <Statistics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongList;
