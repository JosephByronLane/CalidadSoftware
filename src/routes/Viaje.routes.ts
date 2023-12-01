import {Router} from 'express'
import { AgregarActividad, BorrarActividad, ConseguirActividades,  } from '../controllers/Actividad.controller';

const router = Router();

router.post('/actividad',AgregarActividad);
router.delete('/actividad', BorrarActividad);
router.get('/actividad',ConseguirActividades);


export default router