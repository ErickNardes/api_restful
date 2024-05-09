import { Request, Response } from "express";
import { MovieModel } from "../models/Movie";
import logger from "../../config/logger";
import { Types } from "mongoose";

export async function createMovie(req: Request, res: Response) {
  try {
    const data = req.body;
    const movie = await MovieModel.create(data);
    return res.status(201).json(movie);
  } catch (error: any) {
    logger.error(`Erro no sistema: ${error.message}`);
    return res.status(500).json(error);
  }
}

export async function findMovieById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const movie = await MovieModel.findById(id);
    if (!Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Id inválido." });
    }
    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }
    return res.status(200).json(movie);
  } catch (error: any) {
    logger.error(`Erro no sistema: ${error.message}`);
    return res.status(500).json(error);
  }
}

export async function getAllMovies(req: Request, res: Response) {
  try {
    const movies = await MovieModel.find();
    return res.status(200).json(movies);
  } catch (error: any) {
    logger.error(`Erro no sistema: ${error.message}`);
    return res.status(500).json(error);
  }
}

export async function deleteMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }
    await movie.deleteOne();
    return res.status(200).json({ message: "Filme removido com sucesso" });
  } catch (error: any) {
    logger.error(`Erro no sistema: ${error.message}`);
    return res.status(500).json(error);
  }
}

export async function updateMovie(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    await MovieModel.updateOne({ _id: id }, data);
    return res.status(200).json(data);
  } catch (error: any) {
    logger.error(`Erro no sistema: ${error.message}`);
    return res.status(500).json(error);
  }
}
