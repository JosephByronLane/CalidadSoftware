import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Actividad } from '../models/Actividad';

export async function AgregarActividad(req: Request, res: Response) {
  const actividadRepository = AppDataSource.getRepository(Actividad);

  try {
    const nuevaActividad = actividadRepository.create(req.body);
    const resultado = await actividadRepository.save(nuevaActividad);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar actividad", error });
  }
}

export async function BorrarActividad(req: Request, res: Response) {
  const actividadRepository = AppDataSource.getRepository(Actividad);
  const { id } = req.params; // Assumes you're sending the ID as a URL parameter

  try {
    const actividad = await actividadRepository.findOneBy({ id: parseInt(id) });
    if (actividad) {
      await actividadRepository.remove(actividad);
      res.status(200).json({ message: "Actividad eliminada con éxito" });
    } else {
      res.status(404).json({ message: "Actividad no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al borrar actividad", error });
  }
}

export async function ConseguirActividades(req: Request, res: Response) {
  const actividadRepository = AppDataSource.getRepository(Actividad);

  try {
    const actividades = await actividadRepository.find();
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener actividades", error });
  }
}
