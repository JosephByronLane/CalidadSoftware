import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Imagen } from '../models/Imagen';
import { Actividad } from '../models/Actividad';
import { Viaje } from '../models/Viaje';

export async function AgregarImagen(req: Request, res: Response): Promise<Response> {
    const { viajeId, actividadId } = req.params;
    const { link } = req.body;
  
    try {
      const actividad = await AppDataSource.manager.findOneBy(Actividad, {
        id: parseInt(actividadId),
        viaje: { id: parseInt(viajeId) }
      });
  
      if (!actividad) {
        return res.status(404).json({ message: "Actividad no encontrada." });
      }
  
      const nuevaImagen = new Imagen();
      nuevaImagen.direccion = link; 
      nuevaImagen.actividad = actividad;
  
      await AppDataSource.manager.save(Imagen, nuevaImagen);
      return res.status(201).json(nuevaImagen);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message:"Hubo un problema.", error: error });
    }
  }

  export async function ConseguirImagenes(req: Request, res: Response): Promise<Response> {
    const { viajeId, actividadId } = req.params;
    const viaje = await Viaje.findOneBy({
      id:parseInt(viajeId)
    });    
    if(!viaje){
      return res.status(404).json({ message: "Active Actividad not found." });
    }
    try {
      const imagenes = await AppDataSource.manager.findBy(Imagen, {
        actividad: { id: parseInt(actividadId), viaje: { id: parseInt(viajeId) } }
      });
  
      return res.json(imagenes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message:"Hubo un problema.", error: error });
    }
  }
  export async function ConseguirImagen(req: Request, res: Response): Promise<Response> {
const { viajeId, actividadId, imagenId } = req.params;

try {
    const imagen = await AppDataSource.manager.findOneBy(Imagen, {
    id: parseInt(imagenId),
    actividad: { id: parseInt(actividadId), viaje: { id: parseInt(viajeId) } }
    });

    if (imagen) {
    return res.json(imagen);
    } else {
    return res.status(404).json({ message: "Imagen not found." });
    }
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "There was a problem getting the imagen." });
}
}