import {Router} from 'express'
import { AgregarNotas,  ConseguirViaje, ConseguirViajes, RegistrarViaje } from '../controllers/Viaje.controller';

const router = Router();

router.post('/viaje',RegistrarViaje);
router.get('/viaje',ConseguirViajes);
router.get('/viaje/:id',ConseguirViaje);

router.post('/viajes/nota',AgregarNotas );

export default router