import {Router} from 'express'
import { AgregarImagen, ConseguirImagen, ConseguirImagenes } from '../controllers/Imagen.controller';

const router = Router();

router.post('/viaje/:viajeId/actividad/:actividadId/imagen',AgregarImagen);
router.get('/viaje/:viajeId/actividad/:actividadId/imagen', ConseguirImagenes)
router.get('/viaje/:viajeId/actividad/:actividadId/imagen/:imagenId', ConseguirImagen)

export default router