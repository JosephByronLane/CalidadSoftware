import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
class Imagen {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  direccion!: string;

  @ManyToOne(() => Actividad, (actividad) => actividad.imagenes)
  @JoinColumn({ name: "ActividadId" })
  actividad!: Actividad;
}

export { Imagen };