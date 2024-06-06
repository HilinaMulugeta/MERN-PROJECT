const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
});

const Song = mongoose.model('Song', songSchema);

app.get('/songs', async (req, res) => {
  try {
    const { genre } = req.query;
    const filter = genre ? { genre } : {};
    const songs = await Song.find(filter);
    res.send(songs);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching songs', error });
  }
});

app.post('/songs', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.send(song);
  } catch (error) {
    res.status(500).send({ message: 'Error saving song', error });
  }
});

app.put('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(song);
  } catch (error) {
    res.status(500).send({ message: 'Error updating song', error });
  }
});

app.delete('/songs/:id', async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.send({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting song', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
