import {Router} from 'express'
import { AgregarImagen } from '../controllers/Imagen.controller';

const router = Router();

router.get('/actividad',AgregarImagen);


export default router