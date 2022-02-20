import express from 'express';
import path from 'path';
import { fetchAllPlayers, fetchManagerGameweek, fetchGameweekFixtures } from './fpl_api';

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../fpl-transfer-planner/build')));

app.get('/api/allplayers', async (req, res) => {
  const players = await fetchAllPlayers();
  res.json({ players });
});

app.get('/api/managerGameweek/:managerId/:gameweek', async (req, res) => {
  const { managerId, gameweek } = req.params;
  const picks = await fetchManagerGameweek(managerId, gameweek);
  res.json({ picks });
});

app.get('/api/gameweek/:id', async (req, res) => {
  const { id } = req.params;
  const gameweekFixtures = await fetchGameweekFixtures(id);
  res.json(gameweekFixtures);
});

app.listen(3001, () => {
  console.log(`Server listening on ${PORT}`);
})