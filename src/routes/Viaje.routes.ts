import {Router} from 'express'
import { AgregarNotas, ConseguirViajes, RegistrarViaje } from '../controllers/Viaje.controller';

const router = Router();

router.post('/viaje',RegistrarViaje);
router.get('/viaje',ConseguirViajes);

router.post('/notas',AgregarNotas );
router.post('/viaje',AgregarNotas );



export default router