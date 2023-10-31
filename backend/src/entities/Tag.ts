import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import {Ad} from "./Ad";

@Entity()
@ObjectType()
export class Tag extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(()=> ID)
    id!: number;
    @Column()
    @Field()
    name!: string;
    @ManyToMany(() => Ad, (ad) => ad.tags)
    @Field(()=> [Ad])
    ads!: Ad[];
}