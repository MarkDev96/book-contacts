import dotenv from 'dotenv';
dotenv.config()
import EnvSchema from './Schemas/EnvSchema';
export const ENV = EnvSchema.parse(process.env);

import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());

import logger from './Helpers/logger';
import { ErrorMiddleware } from './Helpers/RequestHandler';
import BookContactRouter from './Routers/BookContactRouter';



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/healthz", (_, res) => res.status(200).end());

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use("/v1", BookContactRouter);


app.use(ErrorMiddleware);
const server = app.listen(ENV.PORT, () => logger.info("Api it's running " + ENV.PORT));

export default server;

