import {Router} from 'express'
import { AgregarActividad, BorrarActividad, ConseguirActividad, ConseguirActividades, EditarActividad } from '../controllers/Actividad.controller';

const router = Router();

router.post('/viaje/:viajeId/actividad',AgregarActividad);
router.delete('/viaje/:viajeId/actividad/:actividadId', BorrarActividad);
router.get('/viaje/:viajeId/actividad', ConseguirActividades);
router.get('/viaje/:viajeId/actividad/:actividadId', ConseguirActividad);
router.put('/viaje/:viajeId/actividad/:actividadId', EditarActividad);

export default router