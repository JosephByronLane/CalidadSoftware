import {Router} from 'express'
import { AgregarActividad, BorrarActividad } from '../controllers/Actividad.controller';

const router = Router();

router.get('/actividad',AgregarActividad);
router.get('/actividad', BorrarActividad);


export default router