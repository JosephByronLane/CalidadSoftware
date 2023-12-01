import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
class Viaje {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  nombre: string;

  @Column("datetime")
  fecha_inicio: Date;

  @Column("datetime")
  fecha_final: Date;

  @Column("varchar")
  tipo: string;

  @Column("varchar")
  notas!: string;

  @OneToMany(() => Actividad, (actividad) => actividad.viaje)
  actividades!: Actividad[];
}

export { Viaje };