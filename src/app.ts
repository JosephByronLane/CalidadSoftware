import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ImagenRoutes from './routes/Imagen.routes'
import ViajeRoutes from './routes/Viaje.routes'
import ActividadRoutes from './routes/Actividad.routes'

const app = express();

// Detailed CORS configuration
const corsOptions = {
  origin: '*', // This will allow any domain to access your API
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(morgan('dev'));
app.use(cors(corsOptions)); // Apply the CORS middleware with the options
app.use(express.json());

app.use(ImagenRoutes);
app.use(ViajeRoutes);
app.use(ActividadRoutes);

export default app;