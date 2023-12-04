import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Actividad } from '../models/Actividad';
import { Viaje } from '../models/Viaje';

export async function AgregarActividad(req: Request, res: Response): Promise<Response> {
  const { viajeId } = req.params;
  const actividadData = req.body;

  try {
    const viaje = await AppDataSource.manager.findOneBy(Viaje, { id: parseInt(viajeId) });
    if (!viaje) {
      return res.status(404).json({ message: "Viaje no encontrado." });
    }

    const nuevaActividad = new Actividad();
    Object.assign(nuevaActividad, actividadData);
    nuevaActividad.viaje = viaje;

    await AppDataSource.manager.save(Actividad, nuevaActividad);
    return res.status(201).json(nuevaActividad);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un problema ", error:error });
  }
}

export async function ConseguirActividades(req: Request, res: Response): Promise<Response> {
  const { viajeId } = req.params;

  try {
    const actividades = await AppDataSource.manager.findBy(Actividad, {
      viaje: { id: parseInt(viajeId) },
      activo: 1
    });

    return res.json(actividades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un problema ", error:error });
  }
}

export async function ConseguirActividad(req: Request, res: Response): Promise<Response> {
  const { viajeId, actividadId } = req.params;

  try {
    const actividad = await AppDataSource.manager.findOneBy(Actividad, {
      id: parseInt(actividadId),
      viaje: { id: parseInt(viajeId) },
      activo: 1
    });

    if (actividad) {
      return res.json(actividad);
    } else {
      return res.status(404).json({ message: "Active Actividad not found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un problema ", error:error });
  }
}

export async function BorrarActividad(req: Request, res: Response): Promise<Response> {
  const { viajeId, actividadId } = req.params;

  try {
    const actividad = await AppDataSource.manager.findOneBy(Actividad, {
      id: parseInt(actividadId),
      viaje: { id: parseInt(viajeId) }
    });

    if (!actividad) {
      return res.status(404).json({ message: "Actividad not found." });
    }

    actividad.activo = 0;
    await AppDataSource.manager.save(Actividad, actividad);
    return res.status(200).json({ message: "Actividad ha sido borrada." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un problema ", error:error });
  }
}