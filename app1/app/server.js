import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { routes } from './routes/index.js';

const app = express();

port: env.PORT || 3030

app.use(cors({ origin: `*` }));
app.use(urlencoded({ extended: true }));
app.use(json());

routes(app);

app.listen(3030, () => {
  console.log(`Lytter på http://localhost:3030`);
});