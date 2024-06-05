const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/music', { useNewUrlParser: true, useUnifiedTopology: true, bufferCommands: false });


const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
});

const Song = mongoose.model('Song', songSchema);

app.get('/songs', async (req, res) => {
  const { genre } = req.query;
  const filter = genre ? { genre } : {};
  const songs = await Song.find(filter);
  res.send(songs);
});

app.post('/songs', async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.send(song);
});

app.put('/songs/:id', async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(song);
});

app.delete('/songs/:id', async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.send({ message: 'Song deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
