import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "varchar", length: 255 })
  public title: string;

  @Column({ type: "text" })
  public description: string;

  @Column({ type: "int" })
  public user_id: number;

  @Column({ type: "boolean", default: false })
  public isDeleted: boolean;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
