import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Viaje } from '../models/Viaje';

export async function RegistrarViaje(req: Request, res: Response): Promise<Response> {
  const { nombre, fecha_inicio,destino, fecha_final, tipo } = req.body;
  
  if (!nombre || !fecha_inicio || !fecha_final || !tipo || !destino)  {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    const newViaje = new Viaje();
    newViaje.nombre = nombre;
    newViaje.fecha_inicio = fecha_inicio;
    newViaje.fecha_final = fecha_final;
    newViaje.tipo = tipo;
    newViaje.destino = destino;
    newViaje.notas = ''; 

    const viaje = await AppDataSource.manager.save(newViaje);
    return res.status(201).json({
        status:"yay, todo bien",
        message:"Se agrego correctamente.",
        viaje: viaje
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
        message: "Hubo un problema al registrar el viaje.",
        error: error
    });
  }
}

export async function ConseguirViajes(req: Request, res: Response): Promise<Response> {
  try {
    console.log("returning all viajes")
    const viajes = await AppDataSource.manager.find(Viaje);
    return res.json(viajes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "There was a problem getting the viajes." });
  }
}

export async function ConseguirViaje(req: Request, res: Response): Promise<Response> {
  const { id } = req.params; 
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  try {
    const viaje = await AppDataSource.manager.findOneBy(Viaje, { id: parseInt(id) });
    console.log("ConseguirViaje called with ID:", req.params.id); // Add this line

    if (viaje) {
      return res.json(viaje);
    } else {
      return res.status(404).json({ message: "Viaje not found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "There was a problem getting the viaje." });
  }
}

export async function AgregarNotas(req: Request, res: Response): Promise<Response> {
  const { id, notas } = req.body;

  if (!id || !notas) {
    return res.status(400).json({ message: "ID y notas requeridos" });
  }

  try {
    const viaje = await AppDataSource.manager.findOneBy(Viaje, { id });

    if (!viaje) {
      return res.status(404).json({ message: "Viaje no encontrado." });
    }

    viaje.notas = notas;
    await AppDataSource.manager.save(viaje);
    return res.status(200).json({ message: "Notas agregadas correctamente", viaje });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al agregar las notas.", error: error });
  }
}
