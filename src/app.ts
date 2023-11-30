import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ImagenRoutes from './routes/Imagen.routes'
import ViajeRoutes from './routes/Viaje.routes'
import ActividadRoutes from './routes/Actividad.routes'


const app =express()
app.disable('x-powered-by');

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(ImagenRoutes)
app.use(ViajeRoutes)
app.use(ActividadRoutes)


export default app