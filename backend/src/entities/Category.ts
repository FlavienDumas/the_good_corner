import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Ad } from "./Ad";

@Entity()
@ObjectType()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(()=> ID)
    id!: number;
    @Column()
    @Field()
    name!: string;
    @OneToMany(() => Ad, (ad) => ad.category)
    @Field(()=> [Ad])
    ads!:Ad[];
}