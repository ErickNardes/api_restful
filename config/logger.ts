import winston from "winston";
import config from "config";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = config.get<string>("env") || "development";
  const isDev = env === "development";
  return isDev ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  })
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
  new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  new winston.transports.File({ filename: "logs/http.log", level: "http" }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
