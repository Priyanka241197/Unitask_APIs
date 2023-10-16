import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id: number;

    @Column({type:'varchar', length:150})
    firstName: string;

    @Column({type:'varchar', length:150})
    lastName: string;

    @Column({unique : true,type:'varchar', length:255})
    email: string;

    @Column({type:'text'})
    password: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    async validatePassword(password: string): Promise<boolean> {      
      return bcrypt.compare(password, this.password);
    }

}
