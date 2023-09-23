import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Ad} from "./Ad";

@Entity()
export class Tag extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @ManyToMany(() => Ad, (ad) => ad.tags)
    ads!: Ad[];
}