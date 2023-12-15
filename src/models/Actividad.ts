import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Viaje } from "./Viaje";
import { Imagen } from "./Imagen";

@Entity()
class Actividad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  nombre!: string;

  @Column("varchar")
  ubicacion!: string;

  @Column("datetime")
  fecha_inicio!: Date;

  @Column("datetime")
  fecha_final!: Date;

  @Column({type: 'tinyint', default: 1})
  activo: number;

  @ManyToOne(() => Viaje, (viaje) => viaje.actividades)
  @JoinColumn({ name: "ViajeId" })
  viaje!: Viaje;

  @OneToMany(() => Imagen, (imagen) => imagen.actividad)
  imagenes!: Imagen[];
}

export { Actividad };