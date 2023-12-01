import {Router} from 'express'
import { AgregarImagen, ConseguirImagenes } from '../controllers/Imagen.controller';

const router = Router();

router.post('/actividad',AgregarImagen);
router.get('/ConseguirImagenes', ConseguirImagenes)

export default router