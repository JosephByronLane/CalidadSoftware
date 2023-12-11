import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Actividad } from "./Actividad";

@Entity()
class Viaje extends BaseEntity{
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