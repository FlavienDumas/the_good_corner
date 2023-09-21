import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Ad extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({length: 100})
    title!: string;
    @Column()
    description!: string;
    @Column({length: 100})
    owner!: string;
    @Column()
    price!: number;
    @Column({length: 100})
    picture!: string;
    @Column({length: 100})
    location!: string;
    @Column()
    createdAt!: Date;
    @Column()
    category!: number;
}