import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: "time,hostname,pid",
});

const logger = pino(
  {
    name: "MyLogger",
    level: "info",
  },
  stream
);

export default logger;