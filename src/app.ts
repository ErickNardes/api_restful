require("dotenv").config();
import express from "express";
import config from "../config/default";
import router from "./router";
import db from "../config//db";
import logger from "../config/logger";
import middleware from "./middleware/morganMidleware";

const app = express();

// json midlawares
app.use(express.json());
app.use(middleware);

const port = config.port;

app.use("/api/", router);

app.listen(port, async () => {
  await db();
  logger.info(`server listening on ${port}`);
});
