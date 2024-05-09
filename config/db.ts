import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

export default async function connect() {
  const uri = config.get<string>("dbUri");

  try {
    await mongoose.connect(uri);
    logger.info("Conectado ao banco de dados");
  } catch (error) {
    logger.error("Erro ao conectar ao banco");
    logger.error(error);
    process.exit(1);
  }
}
