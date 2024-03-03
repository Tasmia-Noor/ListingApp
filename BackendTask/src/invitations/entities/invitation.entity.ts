import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: "text" })
  public user_email: string;

  @Column({ type: "text" })
  public expired_at: Date;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
