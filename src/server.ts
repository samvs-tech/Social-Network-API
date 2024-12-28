import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

const cwd = process.cwd();

const PORT = 3001;
const app = express();

const activity = cwd.includes('01-Activities')
  ? cwd.split('01-Activities')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
